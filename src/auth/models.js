const { request } = require("express");
const mongoose = require("mongoose");

const uuid = require("uuid");
var CryptoJs = require ("crypto-js");


const UserSchema = new mongoose.Schema(
    {
        username:{
            type : String,
            trim: true,
            unique:true,

        },
        name:String,
        email:String,
        ency_password: String,
        salt:String,
    },

);
UserSchema.virtual("password").set(function(planpassword){
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(planpassword);
});
UserSchema.methods = {
    securePassword: function(planpassword){
        return Crypto.SHA256(planpassword, this.salt).toString();
    },
    Isauthenticate : function(planpassword){
        return this.ency_password === this.securePassword(planpassword);
    },
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

