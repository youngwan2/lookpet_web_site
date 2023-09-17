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
  const { title, content, author, preview, category } = req.body;

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
          category: category,
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
  const { page, category, search } = req.query;
  console.log(category);
  console.log(page);
  postModel
    .countDocuments()
    .count()
    .then((count) => {
      if (category === "all") {
        const regex = new RegExp(`${search}`, "gi");
        console.log(regex)
        postModel
          .find(
            {
              $or: [
                { title: { $regex: regex } },
                { content: { $regex: regex } },
              ],
            },
            { _id: 0, _v: 0 }
          )
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
      } else if (category === "popular") {
      } else {
        const regex = new RegExp(`${search}`, "gi");
        console.log(regex);
        postModel
          .find({ $and: [{ category: category }] }, { _id: 0, _v: 0 })
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
      }
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
  const posId = req.params.id;
  postModel
    .find({}, { _id: 0, __v: 0 })
    .sort({ id: -1 })
    .limit(10)
    .then((resultPost) => {
      const filter = resultPost.filter((post) => {
        return post.id !== posId * 1;
      });
      res.json({ filter });
    })
    .catch((error) => {
      console.log(error);
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
      likeUserModel.findOne({ postId, username }).then((userInfo) => {
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
            // 방금 유저의 좋아요가 활성화 된 상태이고
            if (likeState) {
              likeCounterModel.findOne({ postId }).then((result) => {
                // 이전에 해당 포스트에 좋아요가 증가한 결과가 없다면 새로 1을 셋팅
                if (!result) {
                  console.log(
                    "이전 정보가 없으므로 좋아요 1을 기본 셋팅합니다."
                  );
                  likeCounterModel.insertMany({ postId, likeCount: 1 });
                  // 정보가 있다면 해당 좋아요를 1 증가 시킨다.
                } else {
                  let { likeCount } = result;
                  console.log("좋아요 갯수:", likeCount);
                  console.log(
                    "정보가 있으므로 기존 좋아요에서 1을 증가시킵니다."
                  );
                  ++likeCount;
                  likeCounterModel
                    .updateOne({ postId }, { likeCount })
                    .then(() => {
                      console.log("성공적으로 좋아요를 1 증가 시켰습니다.");
                    });
                }
              });
            }
            // 방금 유저의 싫어요가 활성화 된 상태라면
            if (unLikeState) {
              likeCounterModel.findOne({ postId }).then((result) => {
                // 현재 포스트에 좋아요/싫어요 가 증가한 결과가 존재하지 않을떄

                console.log("이전 포스트 좋아요/싫어요 정보:", result);
                if (!result) {
                  console.log(
                    "이전 정보가 없으므로 싫어요 1을 기본 셋팅합니다."
                  );
                  likeCounterModel.insertMany({ postId, unlikeCount: 1 });
                  // 이전 포스트에 좋아요/싫어요 가 증가한 결과가 존재 할 때
                } else {
                  let { unlikeCount } = result;
                  console.log("싫어요 갯수:", unlikeCount);
                  console.log(
                    "이전 정보가 존재하므로 기존 게시글의 싫어요를 1 증가 시킵니다."
                  );
                  ++unlikeCount;
                  likeCounterModel
                    .updateOne({ postId }, { unlikeCount })
                    .then(() => {
                      console.log("성공적으로 싫어요를 1 증가 시켰습니다.");
                    });
                }
              });
            }

            res.json({
              msg: `${postId} 게시글에 좋아요/싫어요를 최초로 클릭하셨습니다.`,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        // 해당 게시글에 좋아요/싫어요 유저 정보를 찾았다면
      } else {
        // 기존 유저 정보에 변동 사항(state)을 업데이트 한다
        likeUserModel.updateOne(
          {
            postId: postId,
            username: username,
            like: likeState,
            unlike: unLikeState,
          },
          { upsert: true }
        );
        likeCounterModel.findOne({ postId: postId }).then((findPost) => {
          let { likeCount, unlikeCount } = findPost;
          console.log("총 좋아요:", likeCount, "총 싫어요:", unlikeCount);

          /*
           * ********************************************************************
           * * 각각의 경우의 수를 나눠서 좋아요/싫어요에 대한 분기처리를 실시한다. **
           * ********************************************************************
           */

          // 좋아요는 활성화, 싫어요는 비활성화
          if (likeState && !unLikeState) {
            console.log("좋아요 활성, 싫어요 비활성");
            // 해당 유저 정보를 가져와서 변화된 상태를 업데이트 한다.
            return (
              likeUserModel
                .updateOne(
                  { postId, username },
                  { like: likeState, unlike: unLikeState },
                  { upsert: true }
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
                        upsert: true,
                      }
                    )
                    .then(() => {
                      console.log("좋아요 증가, 싫어요 감소");
                    })
                    .catch(console.error);
                })
            );
          }

          // 좋아요 비활성화, 싫어요 활성화
          if (!likeState && unLikeState) {
            console.log("좋아요 비활성, 싫어요 활성");

            return likeUserModel
              .updateOne(
                { postId, username },
                { like: likeState, unlike: unLikeState },
                { upsert: true }
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
                      upsert: true,
                    }
                  )
                  .then(() => {
                    console.log("좋아요 감소, 싫어요 증가");
                  })
                  .catch(console.error);
              });
          }
          // // 활성 상태였던 좋아요가 비활성 된다면
          // if (!likeState) {
          //   console.log("좋아요 비활성");
          //   // 해당 유저 정보를 찾아서 상태를 업데이트 하고,
          //   return (
          //     likeUserModel
          //       .updateOne(
          //         { postId, username },
          //         { like: likeState, unlike: unLikeState },
          //         { upsert: true }
          //       )
          //       // 좋아요 갯수를 1 감소 시킨 후
          //       .then(() => {
          //         --likeCount;
          //         if (unlikeCount < 0) {
          //           unlikeCount = 0;
          //         }
          //         if (likeCount < 0) {
          //           likeCount = 0;
          //         }
          //         // 변동 사항을 카운터 컬렉션에 업데이트 한다.
          //         likeCounterModel
          //           .updateOne(
          //             { postId: postId },
          //             { likeCount: likeCount },
          //             {
          //               new: true,
          //               runValidators: true,
          //               upsert: true,
          //             }
          //           )
          //           .then(() => {
          //             console.log("좋아요가 1 감소 됩니다.");
          //           });
          //       })
          //   );
          // }

          // // 활성 상태였던 싫어요가 비활성 된다면
          // if (!unLikeState) {
          //   console.log("좋아요 비활성");
          //   // 해당 유저 정보를 찾아서 상태를 업데이트 하고,
          //   return (
          //     likeUserModel
          //       .updateOne(
          //         { postId, username },
          //         { like: likeState, unlike: unLikeState },
          //         { upsert: true }
          //       )
          //       // 싫어요를 1 감소 시켜서
          //       .then(() => {
          //         --unlikeCount;
          //         if (unlikeCount < 0) {
          //           unlikeCount = 0;
          //         }
          //         // 기존 좋아요 카운터 모델을 업데이트 한다.
          //         likeCounterModel
          //           .updateOne(
          //             { postId: postId },
          //             { unlikeCount },
          //             {
          //               new: true,
          //               runValidators: true,
          //               upsert: true,
          //             }
          //           )
          //           .then(() => {
          //             console.log("싫어요가 1 감소 됩니다.");
          //           });
          //       })
          //   );
          // }
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
현재 좋아요 기능 추가 개선 필요점)
- 좋아요를 활성화한 상태에서 다시 좋아요를 누르면 반영되지 않음
- 싫어요의 경우도 마찬가지
- 로직을 추가할 때 관련 로직들이 서로 충돌하는 문제가 발생하여 이를 개선해야 함.
*/
