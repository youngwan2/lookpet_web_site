// 데이터베이스 연결 함수
const DB_CONNECTION = require('../DB/dbConnection/connection')

// 모델 가져오기
const catModel = require('./schema/catModel')
const dogModel = require('./schema/dogModel')
const cattipModel = require('./schema/cattipModel')
const dogtipModel = require('./schema/dogtipModel')
const hospitalModel = require('./schema/hospitalModel')
const cultureModel = require('./schema/cultureModel')

// 디비 저장 할 데이터
const catData = require('../../데이터/고양이/cat.json')
const dogData = require('../../데이터/강아지/dog.json')
const cattipData = require('../../데이터/고양이/cat-tip.json')
const dogtipData = require('../../데이터/강아지/dog-tip.json')
const hospitalData = require('../../데이터/공통/병원/hospital.json')
const cultureData = require('../../데이터/공통/동반가능문화/culture.json')

function save() {
  // 고양이 종별
  catModel
    .insertMany(catData)
    .then(() => {
      console.log('고양이 데이터를 Cats 컬렉션에 저장하였습니다.')
    })
    .catch((error) => {
      console.log('cat 데이터 저장중 문제 발생:', error)
    })
  // 강아지 종별
  dogModel
    .insertMany(dogData)
    .then(() => {
      console.log('강아지 데이터를 Dogs 컬렉션에 저장하였습니다.')
    })
    .catch((error) => {
      console.log('강아지 데이터 저장 중 문제가 발생하였습니다.:', error)
    })

  // // 고양이 팁
  // cattipModel
  //   .insertMany(cattipData)
  //   .then(() => {
  //     console.log('고양이팁 데이터가 정상적으로 저장되었습니다.')
  //   })
  //   .catch((error) => {
  //     console.log('고양이 팁 데이터 저장중 문제가 발생하였습니다.:', error)
  //   })
  // // 강아지 팁
  // dogtipModel
  //   .insertMany(dogtipData)
  //   .then(() => {
  //     console.log('강아지팁 데이터가 정상적으로 저장되었습니다.')
  //   })
  //   .catch((error) => {
  //     console.log('강아지 팁 데이터 저장중 문제가 발생하였습니다.:', error)
  //   })
  // // 병원정보
  // hospitalModel
  //   .insertMany(hospitalData)
  //   .then(() => {
  //     console.log('병원정보 데이터가 정상적으로 저장되었습니다.')
  //   })
  //   .catch((error) => {
  //     console.log('병원정보 데이터 저장중 문제가 발생하였습니다.:', error)
  //   })
  // // 동반가능문화시설
  // cultureModel
  //   .insertMany(cultureData)
  //   .then(() => {
  //     console.log('동반가능문화시설 데이터가 정상적으로 저장되었습니다.')
  //   })
  //   .catch((error) => {
  //     console.log(
  //       '동반가능문화시설 데이터 저장중 문제가 발생하였습니다.:',
  //       error
  //     )
  //   })
}
DB_CONNECTION()
save()
module.exports = save
