import express from "express";
import fs from "fs";
import path from "path";
const users = [];
const app = express();
// Setting up view engine
app.use(express.static(path.join(path.resolve(), "public")));
// Using middleware
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.post("/contact", (req, res) => {
  users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});
app.get("/users", (req, res) => {
    res.json({users})
  });
app.listen(5000, () => {
  console.log("Server ki maka bhosda");
});
