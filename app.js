const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const Flavours = require("./models/flavours");


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/", async (req, res) => {
  const flavours = await Flavours.findAll();
  res.render("index", { flavours });
});


app.get("/toplist", async (req, res) => {
  const flavourList = await Flavours.findAll({
    limit: 10,
    order: [["votes", "DESC"]],
  });
  res.render("toplist", { flavourList });
});


app.post("/vote", async (req, res) => {
 // vote flavour.title
 const flavour = req.body.flavour; 
  const flavourToVote = await Flavours.findOne({ where: { title: flavour } });
  const updateVotes = await Flavours.update( { votes: flavourToVote.votes + 1 }, { where: { title: flavour } });
  res.redirect("/toplist");
})


/*
 app.post("/vote", async(req, res) => {
  const flavour = req.body.flavour; 
  const newVote = await db.query(`SELECT votes FROM flavours WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.SELECT})
  
  const updateVotes = newVote[0].votes + 1
    await db.query(`UPDATE flavours SET votes = ${updateVotes} WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.UPDATE})
    res.redirect('/toplist')
}) */

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
