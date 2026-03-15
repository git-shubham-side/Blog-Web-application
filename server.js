const express = require("express");

const app = express();
const path = require("path");
require("dotenv").config();

//Body Parsers
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files serve
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ message: "data recived" });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

console.log("hello");
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
