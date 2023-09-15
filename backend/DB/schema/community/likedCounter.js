const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedCounterSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
    min:0
  },
  unlikeCount: {
    type: Number,
    default: 0,
    min:0
  },
});

module.exports = mongoose.model('Like', likedCounterSchema, 'Like');
