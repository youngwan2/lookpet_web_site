const express = require('express');
const app = express();
const cors = require('cors');
const DB_CONNECTION = require('./DB/dbConnection/connection');
const catModel = require('./DB/schema/catModel')

DB_CONNECTION();
app.use(cors());
app.use('/', express.static(__dirname + '/dist'));

express.urlencoded({ extended: false });

const PORT = process.env.PORT || 3000;
/* app.get("/animal/map/hospital",()=>{
}) */
app.get('/common/hospital', () => {});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.post('/auth/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send('Hello World!');
});

app.get('/dog', (req, res) => {
  res.json({ name: 'dog' });
});

app.get('/cat', (req, res) => {
  res.json({ name: 'cat' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
