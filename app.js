/* const { Sequelize } = require("sequelize"); */
const express = require("express");
const app = express();
const Flavours = require("./models/flavours");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}))


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


app.get("/login", async (req, res) => {
  res.render("login");
})


app.get("/register", async (req, res) => {
  res.render("register");
})


app.post("/login", async (req, res) => {
res.render("welcome")
})


app.post("/register", async (req, res) => {
  res.render("welcome")
})

  

app.post("/vote", async (req, res) => {
  const flavour = req.body.flavour; //flavour is the name of the input field in the form
  const flavourToVote = await Flavours.findOne({ where: { title: flavour } }); // find the flavour in the database

  const updateVotes = await Flavours.update( // update the votes in the database
    { votes: flavourToVote.votes + 1 }, // add 1 to the votes
    { where: { title: flavour } }  // where the title is the same as the flavour
  );

  res.redirect("/toplist");
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

