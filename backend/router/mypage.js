const express = require('express')
const router = express.Router()
const connection = require('../DB/dbConnection/connection')
const mypetModel = require('../DB/schema/mypetModel')

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

module.exports = router
