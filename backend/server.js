const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use("/",express.static(__dirname + '/public'));

express.urlencoded({ extended: false });

const PORT = process.env.PORT || 3000;


app.get('/',(req, res) => {
  res.send('Hello World!');
  req.body
});


app.get('/login',(req, res) => {
  
    req.body

    res.send('Hello World!');
  });
  

/* app.get('/dog', (req, res) => {
  res.json({ name: 'dog' });
});
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

