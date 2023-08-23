const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 포스트 갯수를 카운팅 하는 스키마
const PostCounterSchema = new Schema({
  count: {
    type: Number,
    unique: true,
    name: {
      type: String,
      default: 'postCounter',
    },
  },
});

module.exports = mongoose.model('PostCount', PostCounterSchema, 'PostCount');
