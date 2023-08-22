const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 강아지정보 스키마 생성
const CatsSchema = new Schema({
  id: String, //기본키(식별키)
  image: String,
  name: String,
  ko_name: String,
  origin: String,
  personality: String,
  appearance: String,
  colors: String,
  care: String,
  health: String,
  life: String,
  weight: String,
});

module.exports = mongoose.model("Dogs", CatsSchema, "Dogs");
