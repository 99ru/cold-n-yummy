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

//  Next page + flavours ordered by votes
app.get("/toplist", async(req, res) => {
  const flavourList = await db.query('SELECT * FROM flavours ORDER BY flavour_votes DESC',
  {type: Sequelize.QueryTypes.SELECT})
  res.render("toplist", { flavourList });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

