const express = require("express");
const router = express.Router();
const catModel = require("../DB/schema/catModel");
const cattipModel = require("../DB/schema/cattipModel");

router.get("/cat/breed/total", (req, res) => {
  const { page } = req.query;
  catModel
    .find({})
    .limit(15)
    .skip(page * 1 * 15)
    .then((result) => {
      res.json(result);
    });
});

// 고양이 품종 정보 필터링
router.get("/cat/breed", (req, res) => {
  const { needs } = req.query;
  catModel
    .find(
      {
        $or: [
          { name: { $regex: new RegExp(needs, "i") } },
          { ko_name: new RegExp(needs) },
        ],
      },
      { _id: 0 }
    )
    .then((result) => {
      res.json(result);
    });
});

// 고양이 디테일 정보
router.get("/cat/breed/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  catModel
    .findOne({ id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(
        "데이터베이스에서 데이터를 가져오던 중 문제가 발생하였습니다.::",
        error
      );
    });
});

// 고양이 팁
router.get("/cat/cattip", (req, res) => {
  console.log("cattip쿼리:", req.query);
  const { page } = req.query;
  cattipModel
    .countDocuments({})
    .count()
    .then((totalCount) => {
      cattipModel
        .find({}, { _id: 0 })
        .skip((page - 1 * 1) * 10) // 지정한 수 만큼 데이터를 생략한다.
        .limit(10) // 지정한 수 만큼만 데이터를 가져온다.
        .then((result) => {
          console.log(result);
          const totalPage = totalCount / 10;
          console.log("총페이지:", totalPage);
          res.json({ result, totalCount, page, totalPage });
        })
        .catch((error) => {
          console.log("고양이 팁 정보를 가져오던 중 문제 발생::", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
