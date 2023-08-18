const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const userModel = require('../DB/schema/userModel');
const connection = require('../DB/dbConnection/connection');

connection();
// 로그인
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log('전달받은 유저정보:', req.body);

  res.json({ message: '로그인 처리가 완료되었습니다.' });
});

//회원가입
router.post('/auth/signup', (req, res) => {
  const { username, password, email } = req.body;

  console.log('회원가입:', req.body);
  //   회원가입 비밀번호 암호화
  const salt = crypto.randomBytes(64);

  crypto.pbkdf2(password, salt, 104906, 64, 'sha512', (err, result) => {
    const hashResult = result.toString('base64');
    console.log('암호화된 비밀번호:', hashResult);

    const userInfo = {
      username,
      password: hashResult,
      email,
    };

    userModel
      .insertMany(userInfo)
      .then((result) => {
        console.log('유저정보를 저장하였습니다.');
      })
      .catch((error) => {
        console.log('에러발생:', error);
      });
  });

  res.json({ message: '회원가입 처리가 완료되었습니다.' });
});

module.exports = router;
