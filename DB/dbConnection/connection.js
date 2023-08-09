const mongoose = require('mongoose');
require('dotenv').config();
const CatsSchema = require('../schema/catSchema');
const fs = require('fs');
const path = require('path');

// 데이터베이스 정보
const DB_INFO = {
  DB_ID: process.env.DB_ID,
  DB_PW: process.env.DB_PW,
  DB_HOST: process.env.DB_HOST,
  DB_COL_NAME: process.env.DB_COL_NAME,
  DB_URL: `mongodb://${DB_INFO.DB_ID}:${DB_INFO.DB_PW}@127.0.0.1/${DB_COL_NAME}`,
};

// 데이터베이스 연결 함수
const DB_CONNECTION = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('연결 성공');
    })
    .catch((err) => {
      console.log('디비 문제:', err);
    });
};

// 연결 중 에러가 발생하면 자동처리 해주는 이벤트
mongoose.connection.on('error', (error) => {
  console.errer('몽고디비 연결 에러:', error);
});

mongoose.connection.on('disconnected', () => {
  console.errer('몽고디비와 연결이 끊어짐. 연결 재시도');
  DB_CONNECTION();
});

module.exports = DB_CONNECTION;
