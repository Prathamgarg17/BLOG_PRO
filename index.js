const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {authRouter}=require("./src/auth/router");
mongoose.set('strictQuery', true);
const app = express();


//database Connection
mongoose.connect("mongodb://localhost:27017/blog");
mongoose.connection.on("connected" , ()=>{
    console.log("Db connected");
});
mongoose.connection.on("error",(e)=>{
    console.log(e);
})

app.use(cors());
app.use(bodyParser.json());
app.use("/user",authRouter);
app.listen(4000, ()=>{
    console.log("Server Started on 4000")
});