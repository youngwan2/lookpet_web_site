const express = require('express')
const router = express.Router()
const connection = require('../DB/dbConnection/connection')
const mypetModel = require('../DB/schema/mypetModel')
const userModel = require('../DB/schema/userModel')
const bcrypto = require('bcrypt')

connection()

/* 마이페이지 */
router.get('/mypage', (req, res) => {
  const { username } = req.query
  mypetModel
    .find({ username: username })
    .then((result) => {
      res.json(result)
      console.log(result)
    })
    .catch((e) => {
      console.log(e)
    })
})

/* 마이페이지 펫 등록 */
router.post('/mypage/register', async (req, res) => {
  const { username, petimage, petname, breeds, gender, age, introduce } =
    req.body
    console.log(req.body)
  try {
    // Find the highest pet ID currently in the database
    const highestPet = await mypetModel.findOne().sort({ petId: -1 }).limit(1)

    let newPetId
    if (highestPet) {
      newPetId = highestPet.petId + 1
    } else {
      newPetId = 1
    }

    const petInfo = {
      petId: newPetId,
      username,
      petimage,
      petname,
      breeds,
      gender,
      age,
      introduce
    }

    await mypetModel.insertMany(petInfo)

    console.log('펫 정보가 등록되었습니다.:', petInfo)
    res.json({ message: '펫 정보가 등록되었습니다.', petInfo })
  } catch (error) {
    console.log('펫 정보 등록에 오류가 생겼습니다.:', error)
    res.status(500).json({ error })
  }
})

// 마이페이지 해당 펫 id값을 찾아 불러오기
router.get('/mypage/petedit/:id', (req, res) => {
  const id = req.params.id
  console.log(id)

  mypetModel
    .findOne({ petId: id })
    .then((result) => {
      if (!result) {
        return res
          .status(404)
          .json({ error: '해당 펫 정보가 존재하지 않습니다.' })
      }
      console.log(result)
      res.json(result)
    })
    .catch((error) => {
      console.log('펫 정보를 불러오는중에 에러가 발생했습니다:', error)
      res.status(500).json({ error })
    })
})

// 해당 펫 id값을 가진 데이터를 찾아 수정된 데이터 업데이트하기
router.post('/mypage/petedit/:id', (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id
  const body = req.body.newPetInfo
  console.log('id:', id)
  console.log('body내용:', body)
  mypetModel
    .updateOne({ petId: id * 1 }, body)
    .then((result) => {
      console.log(result)
      res.json({ message: '데이터 업데이트가 완료되었습니다.' })
    })
    .catch((e) => {
      console.log('데이터 수정 중에 오류가 발생했습니다.', e)
      res.status(500).json({ error: e.message })
    })
})

// 펫 데이터 삭제하기
router.delete('/mypage/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  mypetModel.deleteOne({ petId: id * 1 }).then((result) => {
    console.log(result)
    res.json({
      message: '데이터를 성공적으로 삭제했습니다.',
      success: true
    })
  })
})

/* 유저정보 가져오기 */
router.get('/mypage/useredit', (req, res) => {
  const { username } = req.query
  userModel.findOne({ username: username }).then((result) => {
    res.json(result)
  })
})

/* 유저정보 수정 */

router.post('/mypage/useredit', (req, res) => {
  const newUserInfo = req.body.newUserInfo
  const username = newUserInfo.username
  const password = newUserInfo.password
  const updateInfo = {
    email: newUserInfo.email,
    nickname: newUserInfo.nickname
  }
  userModel
    .findOne({ username: username })
    .then((result) => {
      // 서버에서 받아온 유저의 비밀번호
      const hash = result?.password || ''
      console.log('DB번호:', hash, '요청번호:', password)

      // 암호화된 비밀번호를 비교해서 일치하면 result에 true를 반환
      bcrypto.compare(password, hash, (err, result) => {
        console.log('검증결과:', result)
        if (result) {
          userModel
            .updateOne({ username: username }, updateInfo)
            .then((result) => {
              console.log(result)
              res.json({ message: '유저정보 수정이 완료되었습니다.' })
            })
        } else {
          res.json({
            message: '비밀번호가 일치하지 않습니다.',
            success: false
          })
        }
      })
    })
    .catch((error) => {
      console.log(error)
      res.json({
        message: '일치하는 정보가 존재하지 않습니다.',
        success: false
      })
    })
})

/* 유저정보 삭제 */
router.post('/mypage/withdrawal', (req, res) => {
  const { username, password } = req.body.userInfo
  console.log(username, password)
  res.json({ message: '전송완료' })
  userModel
    .findOne({ username: username })
    .then((result) => {
      if (!result) {
        return res.json({
          message: '유저 정보를 찾을 수 없습니다.',
          success: false
        })
      }
      // 서버에서 받아온 유저의 비밀번호
      const hash = result?.password || ''
      console.log('DB번호:', hash, '요청번호:', password)

      // 암호화된 비밀번호를 비교해서 일치하면 result에 true를 반환
      bcrypto.compare(password, hash, (err, result) => {
        console.log('검증결과:', result)
        if (result) {
          userModel.deleteOne({ username: username }).then((result) => {
            console.log(result)
            mypetModel.deleteMany({ username: username }).then((result) => {
              console.log(result)
              res.json({ message: '유저정보 삭제가 완료되었습니다.' })
            })
          })
        } else {
          return res.json({
            message: '비밀번호가 일치하지 않습니다.',
            success: false
          })
        }
      })
    })
    .catch((error) => {
      console.log(error)
      return res.json({
        message: '일치하는 정보가 존재하지 않습니다.',
        success: false
      })
    })
})

module.exports = router
