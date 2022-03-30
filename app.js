const express = require("express");

const app = express();
const port = 8080;

// Static Files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Set Views
app.set("view engine", "ejs");

// navigation
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/toplist", (req, res) => {
  res.render("toplist");
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
