const express = require("express");
const app = express();
const cors = require("cors");
const DB_CONNECTION = require("./DB/dbConnection/connection");
const catModel = require("./DB/schema/catModel");
const cattipModel = require("./DB/schema/cattipModel");
const dogModel = require("./DB/schema/dogModel");

DB_CONNECTION();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// 라우터 모음
const userRouter = require("./router/user");
const dogRouter = require("./router/dog");
/* 로그인 + 회원가입 */
app.use("/", userRouter);
// '/' + '/auth/login'
//     + '/auth/signup'

app.use("/", express.static(__dirname + "/dist"));

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send("Hello World!");
});

app.get("/cat/breed", (req, res) => {
  catModel.find({}, { _id: 0 }).then((result) => {
    // console.log(result);
    res.json(result);
  });
});

app.get("/cat/breed/:id", (req, res) => {
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

app.get("/cat/cattip", (req, res) => {
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

app.get("/dog/breed", (req, res) => {
  dogModel
    .find({}, { _id: 0 })
    .then((result) => {
      // console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log(
        "데이터베이스에서 데이터를 가져오던 중 문제가 발생하였습니다.::",
        error
      );
    });
});

app.get("/dog/breed/detail/:id", (req, res) => {
  const { id } = req.params;
  dogModel
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
