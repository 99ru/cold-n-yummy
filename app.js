const express = require("express");
const Sequelize = require('sequelize')
const app = express();
const port = 8080;

// Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Set Views
app.set("view engine", "ejs");
const db = new Sequelize('sqlite://database/yummy.sqlite')            

// Home page + gets all flavours
app.get("/", async(req, res) => {
  const flavourList = await db.query('SELECT * FROM flavours', 
  {type: Sequelize.QueryTypes.SELECT})
  res.render("index", { flavourList });
});

//  Toplist + flavours ordered by votes
app.get("/toplist", async(req, res) => {
  const flavourList = await db.query('SELECT * FROM flavours ORDER BY flavour_votes DESC',
  {type: Sequelize.QueryTypes.SELECT})
  res.render("toplist", { flavourList });
});

app.post("/vote", async(req, res) => {
  const flavour = req.body.flavour;
  const voted = await db.query(`SELECT flavour_votes FROM flavours WHERE flavour_title = '${flavour}'`, {type: Sequelize.QueryTypes.SELECT})

  const addVote = voted[0].flavour_votes + 1
    await db.query(`UPDATE flavours SET flavour_votes = ${addVote} WHERE flavour_title = '${flavour}'`, {type: Sequelize.QueryTypes.UPDATE})
    res.redirect('/')

})











app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

