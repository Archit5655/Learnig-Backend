import express from "express";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//Note- dont leave and space in the url to connect to mongo
mongoose
  .connect("mongodb://127.0.0.1:27017", { dbName: "backend" })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

const msgSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const msg = mongoose.model("messeges", msgSchema);

const app = express();
// Setting up view engine
app.use(express.static(path.join(path.resolve(), "public")));
// Using middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
const{token}=req.cookies;
if (token) {
  res.render("logout")
  
} else {
  
  res.render("login");
}
});
app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact",  async(req, res) => {

  await msg.create({name:  req.body.name,email: req.body.email})
  res.redirect("/success");
});
app.get("/users", (req, res) => {
  res.json({ users });
});
app.post("/login" ,(req,res)=>{
  res.cookie("token","I ma login",{httpOnly:true,expires:new Date(Date.now()+60*1000)})
  res.redirect("/")

});
app.post("/logout" ,(req,res)=>{
  // res.cookie("token","I ma login",{httpOnly:true,expires:new Date(Date.now()+60*1000)})
  res.redirect("/success")

})
app.listen(5000, () => {
  console.log("Server ki maka bhosda");
});
