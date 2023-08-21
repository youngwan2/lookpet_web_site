const mongoose = require('mongoose')
const Schema = mongoose.Schema

/// csv 병원 정보 스키마
const cultureSchema = new Schema({
  id: {
    type: Number,
    require: true
  }, // 기본키
  name: String, // 사업장명
  info: String, // 카테고리
  address: String, // 도로명 주소
  time: String, // 운영시간
  size: String, // 크기 제한
  inPsbl: String, // 실내 동반 여부
  update: Number, // 갱신일자
  x: Number, // x좌표
  y: Number // y좌표
})

module.exports = mongoose.model('Culture', cultureSchema, 'Culture')
