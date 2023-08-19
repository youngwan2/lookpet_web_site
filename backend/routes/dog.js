"use strict";

const express = require("express");
const router = express.Router();

router.get("/dog", (req, res) => {
  res.send({ name: "퍼그" });
});

module.exports = router;
