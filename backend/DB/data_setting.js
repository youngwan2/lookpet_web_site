// 모델 가져오기
const catModel = require('./schema/catModel');
const dogModel = require('./schema/dogModel');
const cattipModel = require('./schema/cattipModel');
const dogtipModel = require('./schema/dogtipModel');

// 데이터베이스 연결 함수
const DB_CONNECTION = require('../dbConnection/connection');

// 디비 저장 할 데이터
const catData = require('../../고양이/cat.json');
const dogData = require('../../강아지/dog.json');
const cattipData = require('../../고양이/cat-tip.json');
const dogtipData = require('../../강아지/dog-tip.json');

function save() {
  // 고양이 종별
  catModel
    .insertMany(catData)
    .then(() => {
      console.log('고양이 데이터를 Cats 컬렉션에 저장하였습니다.');
    })
    .catch((error) => {
      console.log('cat 데이터 저장중 문제 발생:', error);
    });
  // 강아지 종별
  dogModel
    .insertMany(dogData)
    .then(() => {
      console.log('강아지 데이터를 Dogs 컬렉션에 저장하였습니다.');
    })
    .catch((error) => {
      console.log('강아지 데이터 저장 중 문제가 발생하였습니다.:', error);
    });

  // 고양이 팁
  cattipModel
    .insertMany(cattipData)
    .then(() => {
      console.log('고양이팁 데이터가 정상적으로 저장되었습니다.');
    })
    .catch((error) => {
      console.log('고양이 팁 데이터 저장중 문제가 발생하였습니다.:', error);
    });
  // 강아지 팁
  dogtipModel
    .insertMany(dogtipData)
    .then(() => {
      console.log('강아지팁 데이터가 정상적으로 저장되었습니다.');
    })
    .catch((error) => {
      console.log('강아지 팁 데이터 저장중 문제가 발생하였습니다.:', error);
    });
}
DB_CONNECTION();
module.exports = save;
