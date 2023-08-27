const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 게시글 스키마 작성
const PostSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  content: String,
  preview: String,
  views: Number,
  author: String,
  date: {
    type: String,
    default: new Date().toLocaleString('ko-KR'),
  },
});

module.exports = mongoose.model('Post', PostSchema, 'Post');
