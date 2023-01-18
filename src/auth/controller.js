const {User} = require("./models");
var jwt = require ("jsonwebtoken");
const key = "gdjshfhkjfjfl";
const register = async(req,res)=>{
  var isExist = await User.findOne({ 
   $or: [{username:req.body.username},{email:req.body.email}]
  });
  if(isExist){
    return res.json({
        status:"Error",
        message:"This Username already exist.",
    });
  }
    var newUser = await User.create(req.body);
    return res.json({status: "User created sucessfully", newUser});
};

const loginMiddleWare = async(req,res,next)=>{
    const {username,password} = req.body;
    if(!username|| !password){
        return res.json({status: "Error", message: "Username and password Required"})
    }
    var user = await User.findOne({username : username});
    if(!user){
        return res.json({status: "Error", message: "Username not found"});
    }
    if(!user.isAuthenticate(password)){
        return res.json({status: "Error", message: "You entered wrong password"});
    }
    var token = jwt.sign({_id:user._id},key);
    req.body.token = token;
    req.body.user = user;
    next();
}
const login=async(req,res)=>{
    return res.json({status: "Login Successful" , data: req.body});

};
const reset=async(req,res)=>{
    var user = await User.findOne({username:req.body.username});
    user.password = req.body.newPassword;
    await user.save();
return res.json({status:"Done", user})
};

module.exports = {register, loginMiddleWare, login,reset};