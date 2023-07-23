import express from 'express';

const app= express()


app.get("/products",(req,res)=>{

            res.status(400).send("merimarzi")
})






 app.listen(5000,()=>{
    console.log("Server ki maka bhosda")
 })