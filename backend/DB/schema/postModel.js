const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 글 작성 시 포스트의 스키마
const postSchema = new Schema({
  title: {
    // 제목
    type: String,
    require: true,
    min: 1,
  },
  content: {
    // 내용
    type: String,
    require: true,
  },
  category: {
    type:String,
    require:true,
    default:'자유'
  },
  date: {
    // 작성날짜
    type: String,
    default: new Date().toLocaleString('ko-KR'),
  },
  writer: {
    // 작성자
    type: String,
    require: true,
  },
  liked: {
    type: Number,
    default: 0,
  },
  unliked: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Post', postSchema, 'Post');
