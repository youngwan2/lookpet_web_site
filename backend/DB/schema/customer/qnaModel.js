const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QnaSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  updateDate: {
    type: String,
    default: new Date().toLocaleString('ko-KR'),
  },
});

module.exports = mongoose.model('Qna', QnaSchema, 'Qna');
