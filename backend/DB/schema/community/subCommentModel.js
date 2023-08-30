const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subCommentSchema = new Schema({
  postId: Number,
  comment: String,
  author: String,
  date: {
    type: String,
    default: new Date().toLocaleString('ko-KR'),
  },
});

module.exports = mongoose.model('SubComments', subCommentSchema, 'SubComments');
