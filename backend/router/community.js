const express = require('express');
const router = express.Router();
const postModel = require('../DB/schema/community/postModel');
const postCounterModel = require('../DB/schema/community/postCounter');

// 커뮤니티 관련 api 라우터

/** 게시글 등록 */
router.post('/board', (req, res) => {
  // 제목, 내용, 작성자
  const { title, content, author } = req.body;

  // 게시글의 갯수를 저장하는 컬렉션의 도큐먼트를 불러온다.
  postCounterModel.find({ name: 'postCounter' }).then((count) => {
    // 게시글을 저장
    postModel
      .insertMany({
        id: count,
        title: title,
        content: content,
        author: author,
      })
      .then((addResult) => {
        console.log('성공적으로 게시글이 등록되었습니다.', addResult);
        // 게시글이 등록되면 게시글 갯수를 카운트 한다.
        postCounterModel
          .updateOne({ name: 'postCounter' }, { $inc: { count: 1 } })
          .then((result) => {
            console.log('성공적으로 게시글 수가 증가하였습니다.', result);
          })
          .catch((error) => {
            console.log('조회수증가에 실패함:', error);
          });
      });
  });
});

/** 게시글 조회*/
router.get('/board', (req, res) => {
  postModel
    .find({}, { _id: 0, _v: 0 })
    .then((result) => {
      console.log('전체 게시글을 조회합니다:', result);
    })
    .catch((error) => {
      console.log('게시글을 가져오던 중 에러가 발생하였습니다.', error);
    });
});

/**게시글 수정 */
router.get('/board/:id', (req, res) => {});

/** 게시글 삭제 */
router.delete('/board/:id', (req, res) => {});

module.exports = router;
