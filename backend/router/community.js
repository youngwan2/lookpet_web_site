const express = require("express");
const router = express.Router();
const postModel = require("../DB/schema/community/postModel");
const postCounterModel = require("../DB/schema/community/postCounter");
const commentModel = require("../DB/schema/community/commentModel");
const likeCounterModel = require("../DB/schema/community/likedCounter");
const likeUserModel = require("../DB/schema/community/likeUserModel");
// 커뮤니티 관련 api 라우터

/** 게시글 등록 */
router.post("/board", (req, res) => {
  // 제목, 내용, 작성자
  const { title, content, author, preview } = req.body;

  // 게시글의 갯수를 저장하는 컬렉션의 도큐먼트를 불러온다.
  postCounterModel
    .find({ name: "postCounter" }, { _id: 0, name: 0 })
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
          console.log("성공적으로 게시글이 등록되었습니다.", addResult);
          // 게시글이 등록되면 게시글 갯수를 카운트 한다.
          postCounterModel
            .updateOne({ name: "postCounter" }, { $inc: { count: 1 } })
            .then((result) => {
              console.log("성공적으로 게시글 수가 증가하였습니다.", result);
            })
            .catch((error) => {
              console.log("조회수증가에 실패함:", error);
            });
        });
    });
});

/** 게시글 조회*/
router.get("/board", (req, res) => {
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
          console.log("게시글을 가져오던 중 에러가 발생하였습니다.", error);
        });
    })
    .catch((error) => {
      console.log("전체 페이지 수 가져오던 중 에러 발생", error);
    });
});

/* 게시글 디테일 조회 */
router.get("/board/:id", (req, res) => {
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

/* 최신글 목록 조회(디테일 게시판 하단 게시글 목록) */
router.get("/board/:id/recent", (req, res) => {
  const posId = req.params.id
  postModel
    .find({}, { _id: 0, __v: 0 }).sort({id:-1}).limit(10)
    .then((resultPost) => {
      const filter = resultPost.filter((post)=>{
        return post.id !== posId*1
      })
      res.json({ filter });
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ msg: "데이터를 찾지 못 했습니다." });
    });
});

/**게시글 수정 */
router.post("/board/:id", (req, res) => {
  const body = req.body.updatePost;
  const { id } = req.params;

  postModel
    .updateOne({ id: id * 1 }, body)
    .then((result) => {
      res.json({ message: "게시글을 수정하였습니다." });
    })
    .catch((error) => {
      console.log(error);
    });
});

/** 게시글 삭제 */
router.delete("/board/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  postModel.deleteOne({ id: id * 1 }).then((result) => {
    res.json({
      message: `${id}번 게시글을 성공적으로 삭제하였습니다.`,
      success: true,
    });
  });
});

/** 댓글 추가 */
router.post("/board/:id/comment", (req, res) => {
  const { postId, comment, author } = req.body.commentInfo;
  commentModel
    .insertMany({
      postId: postId,
      comment: comment,
      author: author,
    })
    .then((result) => {
      res.json({ msg: "잘받음" });
    })
    .catch((error) => {
      console.log(error);
    });
});

/** 댓글 조회 */
router.get("/board/:id/comment", (req, res) => {
  const postId = req.params.id;
  commentModel
    .find({ postId: postId * 1 }, { __v: 0 })
    .then((result) => {
      res.json({ result });
    })
    .catch(console.error);
});

/** 댓글 수정  */
router.put("/board/:id/comment", (req, res) => {
  const { updateComment, updateCommentId } = req.body;

  commentModel
    .updateOne({ _id: updateCommentId }, { comment: updateComment })
    .then(() => {
      res.json({ msg: "성공입니다." });
    })
    .catch((error) => {
      console.log(error);
    });
});

/** 댓글 삭제 */
router.delete("/board/:id/comment", (req, res) => {
  const postId = req.params.id;
  const { target } = req.query;

  commentModel
    .deleteOne({ _id: target, postId: postId })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

// 해당 게시글의 좋아요 정보를 불러와서 유저에게 전달
router.get("/board/:id/like-counter", (req, res) => {
  const postId = req.params.id * 1;
  const username = req.query.username;
  likeCounterModel
    .findOne({ postId: postId * 1 }, { _id: 0, __v: 0 })
    .then((result) => {
      console.log("좋아요/싫어요 결과:", result);
      // 좋아요/싫어요를 클릭한 유저의 정보를 담아서 보낸다(중복클릭)
      likeUserModel.findOne({ username }).then((userInfo) => {
        console.log("유저정보:", userInfo);
        res.status(200).json({ result, userInfo });
      });
    })
    .catch((error) => {
      console.log(
        `${postId}번 게시글의 좋아요 정보를 가져오던 중 에러발생: ${error}`
      );
      console.log(error);
    });
});

// 해당 게시글에 좋아요/싫어요를 클릭한 유저의 정보를 저장
router.post("/board/:id/like-user", (req, res) => {
  const { postId, username, like: likeState, unlike: unLikeState } = req.body;
  const userInfo = req.body;

  console.log("좋아요 클릭한 유저정보:", userInfo);
  // 좋아요를 클릭한 유저정보가 해당 게시글에 존재하지 않으면 추가하고,
  // 존재한다면, 해당 게시글을 찾아 상태를 변경시키고, 변경된 값을 포스트에 반영한다.
  likeUserModel
    .findOne({ postId, username })
    .then((findResult) => {
      console.log("찾은 유저 정보:", findResult);
      // 해당 게시글에 유저 정보 없는 경우 정보를 추가
      if (!findResult) {
        likeUserModel
          .insertMany({
            postId: postId,
            username: username,
            like: likeState,
            unlike: unLikeState,
          })
          .then(() => {
            if (likeState) {
              likeCounterModel.findOne({ postId }).then((result) => {
                console.log("해당 게시글에는 이미 정보가 존재함:", result);
                if (!result) {
                  console.log("정보가 없다.");
                  likeCounterModel.insertMany({ postId, likeCount: 1 });
                } else {
                  console.log("정보가 있다");
                }
              });
            }
            if (unLikeState) {
              likeCounterModel.insertMany({ postId, unlikeCount: 1 });
            }

            res.json({
              msg: `${postId} 게시글에 좋아요/싫어요를 클릭하셨습니다.`,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        // 데이터베이스에서 해당 게시글에 좋아요/싫어요 유저 정보를 찾았다면 실행
      } else {
        likeUserModel.updateOne({
          postId: postId,
          username: username,
          like: likeState,
          unlike: unLikeState,
        });
        likeCounterModel.findOne({ postId: postId }).then((findPost) => {
          console.log("찾은 게시글:", findPost);
          let { likeCount, unlikeCount } = findPost;
          console.log("총 좋아요:", likeCount, "총 싫어요:", unlikeCount);

          // 좋아요는 활성화, 싫어요는 비활성화
          if (likeState && !unLikeState) {
            console.log("좋아요 활성, 싫어요 비활성");
            // 해당 유저 정보를 가져와서 변화된 상태를 업데이트 한다.
            likeUserModel
              .updateOne(
                { postId, username },
                { like: likeState, unlike: unLikeState }
              )
              // 그 후 싫어요는 감소 시키고, 좋아요는 증가시킨다.
              .then(() => {
                --unlikeCount;

                // 이 때 싫어요가 0보다 작다면 0으로 초기화시킨다.
                if (unlikeCount < 0) {
                  unlikeCount = 0;
                }
                likeCounterModel
                  .updateOne(
                    { postId: postId },
                    { likeCount: ++likeCount, unlikeCount: unlikeCount },
                    {
                      //이 옵션을 지정하면 스키마에서의 유효성검사를
                      // 업데이트 시에서 실시간으로 관찰하며 실시한다.
                      new: true,
                      runValidators: true,
                    }
                  )
                  .then(() => {
                    console.log("좋아요 증가, 싫어요 감소");
                  })
                  .catch(console.error);
              });
            console.log(
              "내부 총 좋아요:",
              likeCount,
              "총 싫어요:",
              unlikeCount
            );
          }

          // 좋아요 비활성화, 싫어요 활성화
          if (!likeState && unLikeState) {
            console.log("좋아요 비활성, 싫어요 활성");

            likeUserModel
              .updateOne(
                { postId, username },
                { like: likeState, unlike: unLikeState }
              )
              .then(() => {
                --likeCount;
                if (likeCount < 0) {
                  likeCount = 0;
                }
                likeCounterModel
                  .updateOne(
                    { postId: postId },
                    { unlikeCount: ++unlikeCount, likeCount: likeCount },
                    {
                      new: true,
                      runValidators: true,
                    }
                  )
                  .then(() => {
                    console.log("좋아요 감소, 싫어요 증가");
                  })
                  .catch(console.error);
              });
            console.log(
              "내부 총 좋아요:",
              likeCount,
              "총 싫어요:",
              unlikeCount
            );
          }

          // 좋아요 비활성, 싫어요 비활성
          if (!likeState && !unLikeState) {
            console.log("좋아요 비활성, 싫어요 비활성");

            likeUserModel
              .updateOne(
                { postId, username },
                { like: likeState, unlike: unLikeState }
              )
              .then(() => {
                --unlikeCount, --likeCount;
                // 좋아요와 싫어요 수가 0보다 작다면 0으로 초기화
                if (unlikeCount < 0) {
                  unlikeCount = 0;
                }
                if (likeCount < 0) {
                  likeCount = 0;
                }

                likeCounterModel
                  .updateOne(
                    { postId: postId },
                    { unlikeCount: unlikeCount, likeCount: likeCount },
                    {
                      new: true,
                      runValidators: true,
                    }
                  )
                  .then(() => {
                    console.log("좋아요 감소, 싫어요 감소");
                  });
              });
            console.log(
              "내부 총 좋아요:",
              likeCount,
              "총 싫어요:",
              unlikeCount
            );
          }
        });
        res.json({ meg: "잘받음" });
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("찾지 못했음");
    });
});

module.exports = router;

/* 
내일 해야 할 것: watch를 사용해서 변화된 내용이 바로 렌더링 되도록 하기
import Vue from "vue";

export default {
  name: "MyComponent",
  setup() {
    const [count, setCount] = useState(0);

    watch(
      count,
      (newCount) => {
        console.log("Count changed to:", newCount);
        // 컴포넌트를 다시 렌더링합니다.
        // ...
      },
      { immediate: true }
    );

    return {
      count,
    };
  },
};



*/
