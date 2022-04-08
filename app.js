const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const Flavours = require("./models/flavours");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "not a good secret" }));

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

// GET register form
app.get("/register", async (req, res) => {
  res.render("register");
});

// POST register form & save user to database
app.post("/register", async (req, res) => {
  const { password, email } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: hash,
  });
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/");
});

// GET login form
app.get("/login", async (req, res) => {
  res.render("login");
});

// Post login form & check if user exists in database
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    req.session.user_id = user._id;
    res.send("You are logged in!");
  } else {
    res.send("Wrong password!");
  }
});

















app.post("/vote", async (req, res) => {
  const flavour = req.body.flavour; //flavour is the name of the input field in the form
  const flavourToVote = await Flavours.findOne({ where: { title: flavour } }); // find the flavour in the database

  const updateVotes = await Flavours.update(
    // update the votes in the database
    { votes: flavourToVote.votes + 1 }, // add 1 to the votes
    { where: { title: flavour } } // where the title is the same as the flavour
  );

  res.redirect("/toplist");
});

app.get("/secret", (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  res.send("THIS IS A SECRET PAGE!");
});



const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
