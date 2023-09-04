const express = require('express');
const router = express.Router();
const dogModel = require('../DB/schema/dogModel');
const catModel = require('../DB/schema/catModel');

/* 모델이 예측한 동물에 대한 정보를 가져온다. */
router.get('/breed/add-breed', (req, res) => {
  const { name, breed } = req.query;
  console.log(name, breed);
  const regex = new RegExp(name, 'gi');

  switch (breed) {
    case 'cat': {
      catModel
        .find({ name: { $regex: regex } })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((error) => {
          console.log('고양이 데이터 가져오던 중 문제 발생::', error);
        });
      break;
    }
    case 'dog': {
      dogModel
        .find({ name: { $regex: regex } })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((error) => {
          console.log('고양이 데이터 가져오던 중 문제 발생::', error);
        });
    }
  }
});

module.exports = router;
