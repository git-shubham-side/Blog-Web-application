// ✅ Sabse pehle dotenv
import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ReaderUser } from "./models/ReaderUser.js";

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Static files — imports sahi hone ke baad ab __dirname correct hoga
app.use(express.static(path.join(__dirname, "public")));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function checkUserType(req, res, next) {
  console.log("Invoked CheckUserType Function on Line no 27");
  console.log(req.body.role);
  next();
}

// Routes
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.render("login"));
app.post("/login", async (req, res) => {
  console.log(req.body);
  res.json({ message: "data recived" });
});
app.get("/signup", (req, res) => res.render("signup"));
app.post("/signup", checkUserType, async (req, res) => {
  console.log(req.body);
  res.json({ message: "data recived" });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
