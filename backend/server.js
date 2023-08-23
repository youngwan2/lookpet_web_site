const express = require('express');
const app = express();
const cors = require('cors');
const DB_CONNECTION = require('./DB/dbConnection/connection');

const cookieParser = require('cookie-parser');

DB_CONNECTION();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
// 라우터 모음
const userRouter = require('./router/user');
const dogRouter = require('./router/dog');
const serviceRouter = require('./router/service');
const mypageRouter = require('./router/mypage');
const catRouter = require('./router/cat');
const communityRouter = require('./router/community');

/* 로그인 + 회원가입 */
app.use('/', userRouter);
// '/' + '/auth/login'
//     + '/auth/signup'

/* 서비스(병원정보,문화시설정보) */
app.use('/', serviceRouter);
// '/' + '/service/hospital'
//     + '/service/culture'

/* 펫 등록(마이페이지) */
app.use('/', mypageRouter);
// '/' + '/mypage
// '/' + '/mypage/register

/* 펫 등록(마이페이지) */
app.use('/', mypageRouter);
// '/' + '/mypage
// '/' + '/mypage/register

/* 커뮤니티 게시판*/
app.use('/', communityRouter);
app.use('/', express.static(__dirname + '/dist'));

/* 고양이 */
app.use('/', catRouter);
/* 강아지 */
app.use('/', dogRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


