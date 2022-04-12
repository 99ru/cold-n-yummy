const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const Flavours = require("./models/flavours");
const User = require("./models/user");

/* const bcrypt = require("bcrypt");
const session = require("express-session"); */
/* app.use(session({ secret: "not a good secret" })); */

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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

/* app.post("/vote", async (req, res) => {
  const flavour = req.body.flavour; // form
  const userEmail = req.body.email;
  const flavourToVote = await Flavours.findOne({ where: { title: flavour } });

  // if email is not unique, then we can't vote

  console.log(req.body)
  console.log(flavourToVote.id)

  await User.create({
    email: userEmail,
  });

  await User.update({
    flavourId: flavourToVote.id,
  })

  await Flavours.update(
    { votes: flavourToVote.votes + 1 },
    { where: { title: flavour } }
  );
  res.redirect("/toplist");
}); */

app.post("/vote", async (req, res) => {
  const flavour = req.body.flavour; // form
  const userEmail = req.body.email;
  const flavourToVote = await Flavours.findOne({ where: { title: flavour } });

  //if userEmail is unique, create a new user
  const user = await User.findOne({ where: { email: userEmail } });
  try {
    if (!user) {
      await User.create({
        email: userEmail,
      });

      await Flavours.update(
        { votes: flavourToVote.votes + 1 },
        { where: { title: flavour } }
      );
      res.redirect("/toplist");
    }
  } catch (err) {
    console.log(err);
    console.log("opsiedaisy you already voted!");
    alert("opsiedaisy you already voted!");
    res.redirect("/");
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// LOGIN SKIT //

/* 
app.get("/register", async (req, res) => {
  res.render("register");
});

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

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    req.session.user_id = user._id;
    res.redirect("/secret");
  } else {
    res.send("Wrong password!");
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("login");
}); 

*/
