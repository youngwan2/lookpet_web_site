const csvFilePath = __dirname + "/data/hos.csv";
const fs = require("fs");
const csv = require("csvtojson");
csv({})
  .fromFile(csvFilePath, { encoding: "utf-8" })
  .then((jsonObj) => {
    const filterList = [];
    jsonObj.filter((v, i) => {
      filterList.push({
        id: v.번호,
        name: v.사업장명,
        address: v.도로명전체주소,
        zip_code: v.도로명우편번호,
        update: v.데이터갱신일자,
        x: v["좌표정보(x)"],
        y: v["좌표정보(y)"],
      });
    });
    console.log(filterList);

    const json = JSON.stringify(filterList);

    fs.writeFile("data.json", json, () => {
      console.log("완료!");
    });
  });
