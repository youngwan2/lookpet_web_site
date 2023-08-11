const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/// csv 병원 정보 스키마
const hospitalSchema = new Schema({
  id: {
    type: Number,
    require: true,
  }, // 기본키
  name: String, // 사업장명
  tel:String, // 사업장 전화번호
  address: String, // 도로명 주소
  zip_code:String, // 도로명 우편번호
  update: String, // 갱신일자
  x: Number, // x좌표
  y: Number, // y좌표
});

module.exports = mongoose.model("Hospital", hospitalSchema, "Hospital");
