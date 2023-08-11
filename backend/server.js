const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use("/", express.static(__dirname + "/dist"));

express.urlencoded({ extended: false });

const PORT = process.env.PORT || 3000;


app.get("/animal/map/hospital",()=>{
  
})

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/dist/index.html')
});

app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  res.send("Hello World!");
});

app.post("/auth/post", (req, res) => {});

/* app.get('/dog', (req, res) => {
  res.json({ name: 'dog' });
});
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
