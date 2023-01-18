const jwt = require("jsonwebtoken");
const { Key } = require("../auth/controllers");
const { User } = require("../auth/models");

const isAuthenticated = async (req,res,next)=>{
    //console.log(req.headers.authorizations);
    var token = req.headers.authorization;
    if(!token){
        return res.json({status: "Error",message: "Token Required"})
    }
    try{
    var user = jwt.verify(token,Key);
    if(user && user._id){
        user = await User.findById(user._id);
        if(!user){
            return res.json({status:"Error", message: "Invalid User"});
        }
    }else{
        return res.json({status: "Error - Invalid Token", message: e});
    }
    }catch(e){
        return res.json({status: "Error - Invalid Token", message: e});
    }
    req.body.user_id = user._id;
    next();
}

module.exports = {isAuthenticated};