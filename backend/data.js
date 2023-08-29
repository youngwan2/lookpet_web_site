const csvFilePath = __dirname + '/data/hos.csv'
const fs = require('fs')
const proj4 = require('proj4')
const csv = require('csvtojson')
;(async () => {
  const jsonObj = await csv().fromFile(csvFilePath, { encoding: 'utf-8' })
  const filterList = []

  const source =
    '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=577.3,90.1,463.9,5.137,1.474,5.297,2.4232 +units=m +no_defs' // 원본 좌표 시스템
  const target = '+proj=longlat +ellps=GRS80 +no_defs' // 타겟 좌표 시스템 (경도, 위도)

  await proj4.defs(source, source) // 원본 좌표 시스템 정의
  await proj4.defs(target, target) // 타겟 좌표 시스템 정의

  await Promise.all(
    jsonObj.map(async (v) => {
      const x = parseFloat(v['좌표정보(x)'])
      const y = parseFloat(v['좌표정보(y)'])

      if (!isNaN(x) && !isNaN(y)) {
        const converted = proj4(source, target, [x, y])

        // console.log('경도:', converted[0])
        // console.log('위도:', converted[1])

        filterList.push({
          id: v.번호,
          name: v.사업장명,
          address: v.도로명전체주소,
          zip_code: v.도로명우편번호,
          update: v.데이터갱신일자,
          x: converted[1],
          y: converted[0]
        })
      } else {
        console.log('유효하지 않은 좌표값:', x, y)
      }
    })
  )

  console.log(filterList)

  const json = JSON.stringify(filterList)

  fs.writeFile('hospital.json', json, () => {
    console.log('완료!')
  })
})()
