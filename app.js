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

// Navigation
app.get("/", async(req, res) => {
  const voteFlavour = await db.query('SELECT * FROM flavours', 
  {type: Sequelize.QueryTypes.SELECT})
  res.render("index", { voteFlavour });
});

app.get("/toplist", async(req, res) => {
  const voteFlavour = await db.query('SELECT * FROM flavours ORDER BY flavour_votes DESC',
  {type: Sequelize.QueryTypes.SELECT})
  res.render("toplist", { voteFlavour });
});

app.post("/setvote", async(req, res) => {
  const flavour_id = req.body.flavour_id;
  const flavour_votes = req.body.flavour_votes;
  const flavour_title = req.body.flavour_title;
  const voteFlavour = await db.query('UPDATE flavours SET flavour_votes = ? WHERE flavour_id = ?',
  {replacements: [flavour_votes, flavour_id]})
  res.redirect("/toplist");
})



/* app.get("/toplist", (req, res) => {
  res.render("toplist");
}) */

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


/* 
# sql orderd by votes 

SELECT * FROM flavours
ORDER BY flavour_votes DESC; 

*/