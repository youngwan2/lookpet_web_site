const express = require('express');
const router = express.Router();
const postModel = require('../DB/schema/community/postModel');
const postCounterModel = require('../DB/schema/community/postCounter');
const commentModel = require('../DB/schema/community/commentModel');
const likedModel = require('../DB/schema/community/likedCounter');
const likeUserModel = require('../DB/schema/community/likeUserModel');
// 커뮤니티 관련 api 라우터

/** 게시글 등록 */
router.post('/board', (req, res) => {
  // 제목, 내용, 작성자
  const { title, content, author, preview } = req.body;

  // 게시글의 갯수를 저장하는 컬렉션의 도큐먼트를 불러온다.
  postCounterModel
    .find({ name: 'postCounter' }, { _id: 0, name: 0 })
    .then((count) => {
      // 게시글을 저장
      postModel
        .insertMany({
          id: count[0].count,
          title: title,
          content: content,
          preview: preview,
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
  const { page } = req.query;
  console.log(page);
  postModel
    .countDocuments()
    .count()
    .then((count) => {
      postModel
        .find({}, { _id: 0, _v: 0 })
        .sort({ id: -1 })
        .skip((page * 1 - 1) * 10)
        .limit(10)
        .then((result) => {
          const totalCount = Math.ceil(count / 10);
          res.json({ result, totalCount });
        })
        .catch((error) => {
          console.log('게시글을 가져오던 중 에러가 발생하였습니다.', error);
        });
    })
    .catch((error) => {
      console.log('전체 페이지 수 가져오던 중 에러 발생', error);
    });
});

/* 게시글 디테일 조회 */
router.get('/board/:id', (req, res) => {
  const { id } = req.params;
  postModel
    .find({ id: id * 1 }, { _id: 0, __v: 0 })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

/**게시글 수정 */
router.post('/board/:id', (req, res) => {
  const body = req.body.updatePost;
  const { id } = req.params;

  postModel
    .updateOne({ id: id * 1 }, body)
    .then((result) => {
      res.json({ message: '게시글을 수정하였습니다.' });
    })
    .catch((error) => {
      console.log(error);
    });
});

/** 게시글 삭제 */
router.delete('/board/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  postModel.deleteOne({ id: id * 1 }).then((result) => {
    res.json({
      message: `${id}번 게시글을 성공적으로 삭제하였습니다.`,
      success: true,
    });
  });
});

router.post('/board/:id/comment', (req, res) => {
  const { postId, comment, author } = req.body.commentInfo;
  commentModel
    .insertMany({
      postId: postId,
      comment: comment,
      author: author,
    })
    .then((result) => {
      res.json({ msg: '잘받음' });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/board/:id/comment', (req, res) => {
  const postId = req.params.id;
  commentModel
    .find({ postId: postId * 1 }, { __v: 0 })
    .then((result) => {
      res.json({ result });
    })
    .catch(console.error);
});

// 해당 게시글의 좋아요 정보를 불러와서 유저에게 전달
router.get('/board/:id/like-counter', (req, res) => {
  const { postId } = req.params;
  likedModel
    .findOne({ postId: postId })
    .then((result) => {
      console.log('좋아요/싫어요 결과:', result);
      res.json(result);
    })
    .catch((error) => {
      console.log(
        `${postId}번 게시글의 좋아요 정보를 가져오던 중 에러발생: ${error}`
      );
      console.log(error);
    });
});

// 해당 게시글에 좋아요/싫어요를 클릭한 유저의 정보를 저장
router.post('/board/:id/like-user', (req, res) => {
  const { id } = req.params.id;
  const userInfo = req.body;

  console.log(userInfo);

  likeUserModel
    .insertMany(userInfo)
    .then((result) => {
      console.log('성공적으로 올렸음:', result);
      res.json({ meg: '잘받음' });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
