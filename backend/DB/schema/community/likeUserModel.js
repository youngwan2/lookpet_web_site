const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeUserSchema = new Schema({
  postId: String, //각 포스트 식별자
  username: String, // 유저의 이름
  like: Boolean, // 좋아요 상태
});

module.exports = mongoose.model('LikeUsers', likeUserSchema, 'LikeUsers');
