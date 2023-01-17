const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set('strictQuery', true);
const app = express();


//database Connection
mongoose.connect("mongodb://127.0.0.1:27017/blog");
mongoose.connection.on("connected" , ()=>{
    console.log("Db connected");
});
mongoose.connection.on("error",(e)=>{
    console.log(e);
})

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, ()=>{
    console.log("Server Started on 4000")
});