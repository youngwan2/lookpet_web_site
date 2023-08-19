const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());
app.use("/", express.static(__dirname + "/dist"));
express.urlencoded({ extended: false });

const userRouter = require("./routes/user");
const dogRouter = require("./routes/dog");

app.use("/", userRouter);
app.use("/", dogRouter);

app.get("/animal/map/hospital", (req, res) => {});

// 루트 경로로 들어올 때 보이는 메인 화면
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

//============== 서버오픈 ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
