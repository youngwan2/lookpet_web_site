const express = require('express')
const router = express.Router()
const hospitalModel = require('../DB/schema/hospitalModel')
const cultureModel = require('../DB/schema/cultureModel')
const connection = require('../DB/dbConnection/connection')

connection()

// 동물병원정보
router.get('/service/hospital', (req, res) => {
  hospitalModel.find({}, { _id: 0 }).then((result) => {
    res.json(result)
  })
})

// 반려동물 동반가능 문화시설 정보
router.get('/service/culture', (req, res) => {
  cultureModel.find({}, { _id: 0 }).then((result) => {
    res.json(result)
  })
})

module.exports = router
