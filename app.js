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
  const voteFlavour = await db.query('SELECT * FROM flavours', {type: Sequelize.QueryTypes.SELECT})
  res.render("index", { voteFlavour });
});

app.get("/toplist", (req, res) => {
  res.render("toplist");
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
