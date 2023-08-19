const mongoose = require('mongoose');
const { Schema } = mongoose;

// 스키마 생성
const DogtipSchema = new Schema({
  id: {
    type: String,
    required: true,
    unipue: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// 모델 생성 및 내보내기
module.exports = mongoose.model('Dogtip', DogtipSchema, 'Dogtip');
