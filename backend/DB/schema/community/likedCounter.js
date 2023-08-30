const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedCounterSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  unlike: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Like', likedCounterSchema, 'Like');
