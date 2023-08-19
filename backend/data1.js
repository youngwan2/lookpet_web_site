const csvFilePath = __dirname + '/data/with.csv'
const fs = require('fs')
const csv = require('csvtojson')
csv({})
  .fromFile(csvFilePath, { encoding: 'utf-8' })
  .then((jsonObj) => {
    const filterList = []
    jsonObj.filter((v, i) => {
      filterList.push({
        id: v.id,
        name: v.시설명,
        info: v.시설정보,
        address: v.도로명주소,
        time: v.운영시간,
        size: v.반려동물크기제한,
        inPsbl: v.내부동반가능여부,
        update: v.갱신일,
        x: v['좌표정보(x)'],
        y: v['좌표정보(y)']
      })
    })
    console.log(filterList)

    const json = JSON.stringify(filterList)

    fs.writeFile('withpet.json', json, () => {
      console.log('완료!')
    })
  })
