import express from 'express';
import fs from 'fs'
import path from 'path';

const app= express()


app.get("/products",(req,res)=>{
const loc=path.resolve()

//  showing file data from index.html

// res.sendFile(path.join(loc,"./index.html"))
res.render()



})






 app.listen(5000,()=>{
    console.log("Server ki maka bhosda")
 })