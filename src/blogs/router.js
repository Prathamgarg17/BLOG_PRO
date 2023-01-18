const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const blogRouter = express.Router();

const {createBlog,deleteBlog,updateBlog,readBlog} = require("./controllers");


blogRouter.route("/blog").post(isAuthenticated,createBlog).get(isAuthenticated,readBlog);

// blogRouter.post("/createblog",isAuthenticated,createBlog);
// blogRouter.post("/deleteblog",deleteBlog);
// blogRouter.post("/updateblog",updateBlog);
// blogRouter.get("/readblog",readBlog);

module.exports = {blogRouter};