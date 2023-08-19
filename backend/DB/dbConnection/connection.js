const dotenv = require('dotenv')
dotenv.config()

<<<<<<< HEAD
const { DB_USER, DB_PW, DB_HOST } = process.env;
const mongoose = require("mongoose");

const DB_URL = `mongodb://${DB_USER}:${DB_PW}@${DB_HOST}/LOOK_PET_DB`;

console.log(DB_URL);
=======
const { DB_USER, DB_PW, DB_HOST } = process.env
const mongoose = require('mongoose')
const DB_URL = `mongodb://${DB_USER}:${DB_PW}@${DB_HOST}/LOOK_PET_DB`

>>>>>>> 2cd75fc14f72dc6c10a7f0d35490ceff3697d149
// 데이터베이스 연결 함수
const DB_CONNECTION = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('연결 성공')
    })
    .catch((err) => {
      console.log('디비 문제:', err)
    })
}

// 연결 중 에러가 발생하면 자동처리 해주는 이벤트
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러:', error)
})

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비와 연결이 끊어짐. 연결 재시도')
  DB_CONNECTION()
})

// 디비 연결 함수를 내보낸다.
module.exports = DB_CONNECTION
