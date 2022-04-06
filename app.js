const express = require("express");
const Sequelize = require('sequelize')
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
const db = new Sequelize('sqlite://database/yummy.sqlite')            


app.get("/", async(req, res) => {
  const flavourList = await db.query('SELECT * FROM flavours', 
  {type: Sequelize.QueryTypes.SELECT})
  res.render("index", { flavourList });
});


app.get("/toplist", async(req, res) => {
  const flavourList = await db.query('SELECT * FROM flavours ORDER BY votes DESC',
  {type: Sequelize.QueryTypes.SELECT})
  res.render("toplist", { flavourList });
});


app.post("/vote", async(req, res) => {
  const flavour = req.body.flavour; 
  const newVote = await db.query(`SELECT votes FROM flavours WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.SELECT})
  
  const updateVotes = newVote[0].votes + 1
    await db.query(`UPDATE flavours SET votes = ${updateVotes} WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.UPDATE})
    res.redirect('/toplist')
})

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

