import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
//Note- dont leave and space in the url to connect to mongo
mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "backend" })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

const userschema = new mongoose.Schema({
  name: String,
  email: String,
});

const user = mongoose.model("user", userschema);

const app = express();
// Setting up view engine
app.use(express.static(path.join(path.resolve(), "public")));
// Using middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
const secret="gbgregergerb"
const isauth =  async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
  const decode =  jwt.verify(token,secret);
  req.userid = await user.findById(decode._id);
  console.log(decode)

    // next is like break function it will directly jump  to next route
    next();
  } else {
    res.render("login");
  }
};

app.get("/", isauth, (req, res) => {
  // console.log(req.userid)
  res.render("logout");
});

app.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const userid = await user.create({ name, email });
  const token=jwt.sign({ _id: userid._id}, secret);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});
app.get("/logout", (req, res) => {
  console.log(req.body);
  // res.cookie("token","I ma login",{httpOnly:true,expires:new Date(Date.now()+60*1000)})
  res.cookie("token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
app.listen(5000, () => {
  console.log("Server ki maka bhosda");
});
