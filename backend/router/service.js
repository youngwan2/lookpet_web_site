const express = require('express')
const router = express.Router()
const hospitalModel = require('../DB/schema/hospitalModel')
const cultureModel = require('../DB/schema/cultureModel')
const connection = require('../DB/dbConnection/connection')

connection()

// 동물병원정보
router.get('/service/hospital', (req, res) => {
  const { region, page } = req.query

  const showItems = 20 // 페이지당 보여줄 항목 수

  hospitalModel
    .find({ address: new RegExp(region) })
    .countDocuments({})
    .count()
    .then((totalCount) => {
      const totalPage = Math.ceil(totalCount / showItems) // 총 페이지 수 계산

      hospitalModel
        .find({ address: new RegExp(region) })
        .skip((page - 1) * showItems)
        .limit(showItems)
        .then((result) => {
          console.log(result)
          console.log('총페이지:', totalPage)
          console.log(region, page)
          res.json({ result, totalCount, page, totalPage })
        })
        .catch((error) => {
          console.log('데이터 조회 중 에러:', error)
        })
    })
    .catch((error) => {
      console.log('데이터 수 조회 중 에러:', error)
    })
})

// 반려동물 동반가능 문화시설 정보
router.get('/service/culture', (req, res) => {
  const { category, page } = req.query

  const showItems = 20 // 페이지당 보여줄 항목 수

  cultureModel
    .find({ info: new RegExp(category) })
    .countDocuments({})
    .count()
    .then((totalCount) => {
      const totalPage = Math.ceil(totalCount / showItems) // 총 페이지 수 계산

      cultureModel
        .find({ info: new RegExp(category) })
        .skip((page - 1) * showItems)
        .limit(showItems)
        .then((result) => {
          console.log(result)
          console.log('총페이지:', totalPage)
          console.log(category, page)
          res.json({ result, totalCount, page, totalPage })
        })
        .catch((error) => {
          console.log('데이터 조회 중 에러:', error)
        })
    })
    .catch((error) => {
      console.log('데이터 수 조회 중 에러:', error)
    })
})

module.exports = router