const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeUserSchema = new Schema({
  postInfo: [{ postId: String, like: Boolean }], //각 포스트 식별자
  username: String, // 유저의 이름
});

module.exports = mongoose.model('LikeUsers', likeUserSchema, 'LikeUsers');
