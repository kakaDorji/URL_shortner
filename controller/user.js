const User=require('../models/user');
const {v4:uuidv4}=require("uuid");
const{setUser}=require("../services/auth");


async function handleUserSignUp(req,res){
const {name,email,password}=req.body;
 await User.create({
  name,
  email,
  password
 });
 return res.redirect("/");
}


async function handleuserLogin(req,res){
const {email,password}=req.body;
const user= await User.findOne({email,password});
if(!user)  return res.render("login",{error:"invalid username or Password"});
// const sessionId=uuidv4();
const token=setUser(user);
// setUser(sessionId,user);
// res.cookie("uid",token);
res.cookie("token",token);
// return res.json({token});
return res.redirect('/');
} 

module.exports={ 
  handleUserSignUp,
  handleuserLogin
}