const express = require('express');
const router = express.Router();
const dogModel = require('../DB/schema/dogModel');
const dogtipModel = require('../DB/schema/dogtipModel');

router.get('/dog/breed', (req, res) => {
  dogModel
    .find({}, { _id: 0 })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(
        '데이터베이스에서 데이터를 가져오던 중 문제가 발생하였습니다.::',
        error
      );
    });
});

router.get('/dog/breed/detail/:id', (req, res) => {
  const { id } = req.params;
  dogModel
    .findOne({ id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(
        '데이터베이스에서 데이터를 가져오던 중 문제가 발생하였습니다.::',
        error
      );
    });
});

router.get('/dog/dogtip', (req, res) => {
  console.log('dogtip쿼리:', req.query);
  const { page } = req.query;
  dogtipModel
    .countDocuments({})
    .count()
    .then((totalCount) => {
      dogtipModel
        .find({}, { _id: 0 })
        .skip((page - 1 * 1) * 10) // 지정한 수 만큼 데이터를 생략한다.
        .limit(10) // 지정한 수 만큼만 데이터를 가져온다.
        .then((result) => {
          console.log(result);
          const totalPage = totalCount / 10;
          console.log('총페이지:', totalPage);
          res.json({ result, totalCount, page, totalPage });
        })
        .catch((error) => {
          console.log('강아지 팁 정보를 가져오던 중 문제 발생::', error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
