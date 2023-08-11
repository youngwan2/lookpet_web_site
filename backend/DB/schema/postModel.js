const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 글 작성 시 포스트의 스키마
const postSchema = new Schema({
  title: { // 제목
    type: String,
    require: true,
    min: 1,
  },
  content: { // 내용
    type: String,
    require: true,
  },
  date: { // 작성날짜
    type: Date,
    default: Date.now(),
  },
  writer: { // 작성자
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Post", postSchema, "Post");
