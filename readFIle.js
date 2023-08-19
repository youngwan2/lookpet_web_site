// 지정 경로의 파일의 데이터를 읽어온다.
const fs = require("fs");

fs.readFile(__dirname + "/data/cat.json", (err, data) => {
  let json = data.toString();

  let trans = JSON.parse(json);
  console.log(trans);
});
