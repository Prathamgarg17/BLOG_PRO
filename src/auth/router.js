const express = require("express");
const { loginMiddleWare } = require("./controller");
const authRouter = express.Router();
const { register, login, reset} = require("./controller");
authRouter.post("/register",register);
authRouter.post("/login", loginMiddleWare, login);
authRouter.post("/reset", loginMiddleWare, reset);

module.exports = {authRouter};