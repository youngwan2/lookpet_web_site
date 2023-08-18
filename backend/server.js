const express = require('express');
const app = express();
const cors = require('cors');
const DB_CONNECTION = require('./DB/dbConnection/connection');
const catModel = require('./DB/schema/catModel');
const dogModel = require('./DB/schema/dogModel');

DB_CONNECTION();
app.use(cors());
app.use('/', express.static(__dirname + '/dist'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/common/hospital', () => {});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.post('/auth/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send('Hello World!');
});

app.get('/dog/breed', (req, res) => {
  dogModel.find({}, { _id: 0 }).then((result) => {
    console.log(result);
    res.json(result);
  });
});

app.get('/cat/breed', (req, res) => {
  catModel.find({}, { _id: 0 }).then((result) => {
    console.log(result);
    res.json(result);
  });
});

app.get('/cat/breed/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  catModel
    .findOne({ id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(
        '데이터베이스에서 데이터를 가져오던 중 문제가 발생하였습니다.::',
        error
      );
    });
});

app.get('/dog/breed/detail/:id', (req, res) => {
  const { id } = req.params;
  dogModel.findOne({ id: id }).then((result) => {
    res.json(result);
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
