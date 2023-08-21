const express = require('express');
const app = express();
const cors = require('cors');
const DB_CONNECTION = require('./DB/dbConnection/connection');
const catModel = require('./DB/schema/catModel');
const dogModel = require('./DB/schema/dogModel');

DB_CONNECTION();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// 라우터 모음
const userRouter = require('./router/user');

/* 로그인 + 회원가입 */
app.use('/', userRouter);
// '/' + '/auth/login'
//     + '/auth/signup'

app.use('/', express.static(__dirname + '/dist'));

const PORT = process.env.PORT || 3000;

app.post('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/cat/breed', (req, res) => {
  catModel.find({}, { _id: 0 }).then((result) => {
    console.log(result);
    res.json(result);
  });
});

app.get('/cat/breed/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  catModel
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

app.get('/dog/breed', (req, res) => {
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

app.get('/dog/breed/detail/:id', (req, res) => {
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
