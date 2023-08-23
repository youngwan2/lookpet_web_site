const express = require('express')
const router = express.router()
const connection = require('../DB/dbConnection/connection')
const mypetModel = require('../DB/schema/mypetModel')

connection()

// 마이페이지 펫 등록
router.post('/mypage/register', (req, res) => {
  const { petname, breeds, gender, age, introduce } = req.body
  const petInfo = {
    petname,
    breeds,
    gender,
    age,
    introduce
  }
  mypetModel
    .insertMany(petInfo)
    .then((result) => {
      console.log('펫 정보가 등록되었습니다.')
    })
    .catch((error) => {
      console.log('펫 정보 등록에 오류가 생겼습니다.:', error)
    })
})
