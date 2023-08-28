const express = require('express');
const router = express.Router();
const bcrypto = require('bcrypt');
const userModel = require('../DB/schema/userModel');
const connection = require('../DB/dbConnection/connection');

/* 클라이언트단에서 암호화해서 */
/* https://www.npmjs.com/package/crypto-js */
connection();
// 로그인
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log('전달받은 유저정보:', req.body);

  userModel
    .findOne({ username: username })
    .then((result) => {
      // 서버에서 받아온 유저의 비밀번호
      const hash = result?.password || '';
      console.log('DB번호:', hash, '요청번호:', password);

      // 암호화된 비밀번호를 비교해서 일치하면 result에 true를 반환
      bcrypto.compare(password, hash, (err, result) => {
        console.log('검증결과:', result);
        if (result) {
          res.json({ message: '서명된 쿠키가 생성되었습니다..' });
        } else {
          res.status(401).json({
            message: '일치하는 정보가 존재하지 않습니다.',
            success: false,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: '일치하는 정보가 존재하지 않습니다.',
        success: false,
      });
    });
});

// 로그인이 성공한다면, 쿠키를 생성하여 브라우저로 전송한다.
router.get('/auth/login', (req, res) => {
  const { name } = req.query;
  console.log('get:', req.query);

  res.cookie('username', name);
  res.json({ message: `${name}님이 로그인하셨습니다.`, isLogin: true });
});

//회원가입
router.get('/auth/signup', (req, res) => {
  userModel.find({}, { _id: 0, password: 0 }).then((result) => {
    res.json(result);
  });
});
router.post('/auth/signup', (req, res) => {
  const { username, password, email } = req.body;

  console.log('회원가입:', req.body);
  //   회원가입 비밀번호 암호화
  const saltRounds = 10;

  bcrypto.genSalt(saltRounds, (err, salt) => {
    bcrypto.hash(password, salt, (err, hash) => {
      // 유저 정보
      const userInfo = {
        username,
        password: hash,
        email,
      };
      // 유저 모델
      userModel
        .insertMany(userInfo)
        .then((result) => {
          console.log('유저정보를 저장하였습니다.');
          res.json({ message: '회원가입 처리되었습니다.' });
        })
        .catch((error) => {
          console.log('에러발생:', error);
        });
    });
  });
});

// 데이터베이스에 저장된 유저 정보가 있는지 확인
router.post('/auth/check', (req, res) => {
  const { username } = req.body;
  userModel.findOne({ username: username }).then((result) => {
    if (result) {
      res.json({ message: '중복된 아이디입니다.', success: false });
    } else {
      res.json({ message: '생성가능한 아이디입니다.', success: true });
    }
  });
});

module.exports = router;
