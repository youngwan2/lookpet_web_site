/* 유저의 로그인/회원가입/로그아웃 등의 로직을 관리한다. */
"use strict";

const express = require("express");
const router = express.Router();

/* json 형태로 전달 받은 데이터를 읽을 수 있게 파싱해준다. */
router.use(express.json()); 

/* 로그인을 처리한다. */
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  // DB의 유저 정보와 유저가 보낸 정보가 일치하면 통과
   // -- 관련 로직들어가는 곳 --
   
  res.json({ name: "환영합니다." });
});


/* 회원가입을 처리한다. */
router.post("/auth/sign",(req,res)=>{
  const {username, password, email} = req.body
})

/* 로그아웃을 처리한다. */
router.get("/logout",(req,res)=>{

})
module.exports = router;
