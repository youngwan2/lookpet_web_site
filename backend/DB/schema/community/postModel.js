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
  views: Number,
  author: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', PostSchema, 'Post');
