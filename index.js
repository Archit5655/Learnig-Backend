import express from 'express';
import fs from 'fs'
import path from 'path';

const app= express()
// Setting up view engine
app.set("view engine",'ejs')


app.get("/products",(req,res)=>{
    //  showing file data from index.html
// const loc=path.resolve()


// res.sendFile(path.join(loc,"./index.html"))
// 


// Using ejs to make our dat dynamic using tag  <% %> we can write javascript in it and can pass to our file by using render function and changing the file name from .html to .ejs and putting that file under the views folder 



res.render('index.ejs',{name:"Archit" ,HEIGHT:"34"})




})






 app.listen(5000,()=>{
    console.log("Server ki maka bhosda")
 })