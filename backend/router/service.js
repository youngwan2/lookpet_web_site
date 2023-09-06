const express = require('express')
const router = express.Router()
const hospitalModel = require('../DB/schema/hospitalModel')
const cultureModel = require('../DB/schema/cultureModel')
const connection = require('../DB/dbConnection/connection')

connection()

// 동물병원정보
router.get('/tools/hospital', (req, res) => {
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
router.get('/tools/culture', (req, res) => {
  const { region, category, page } = req.query
  const showItems = 20 // 페이지당 보여줄 항목 수
  cultureModel
    .find({ address: new RegExp(region) })
    .countDocuments()
    .count()
    .then((totalCount) => {
      const totalPage = Math.ceil(totalCount / showItems) // 총 페이지 수 계산
      if (region && category) {
        cultureModel
          .find({
            $and: [{ address: new RegExp(region) }, { info: category }]
          })
          .skip((page - 1) * showItems)
          .limit(showItems)
          .then((result) => {
            console.log('총페이지:', totalPage)
            console.log(region,category, page)
            res.json({ result, totalCount, page, totalPage })
          })
          .catch((error) => {
            console.log('지역,카테고리 별 데이터 조회 중 에러:', error)
          })
      } else {
        cultureModel
          .find({ address: new RegExp(region) })
          .skip((page - 1) * showItems)
          .limit(showItems)
          .then((result) => {
            console.log('총 페이지:', totalPage)
            console.log(region, page)
            res.json({ result, totalCount, page, totalPage })
          })
          .catch((e) => {
            '지역별 데이터 조회 중 에러:', e
          })
      }
    })
})

module.exports = router
