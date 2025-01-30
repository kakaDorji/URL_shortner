const express=require("express");
const router=express.Router();
const URL=require("../models/url");
const { restrictTo } = require("../middleware/auth");


router.get("/admin/urls", restrictTo(['admin']),async (req, res) => {
  if(!req.user) return res.redirect('/login');
  const allUrl=await URL.find({});
  return res.render('home',{
    urls:allUrl
  }); // Render home page with user's URLs
});



router.get("/", restrictTo(['normal','admin']),async (req, res) => {
  if(!req.user) return res.redirect('/login');
  const allUrl=await URL.find({createdBy:req.user._id});
  return res.render('home',{
    urls:allUrl
  }); // Render home page with user's URLs
});

 

router.get("/signup",(req,res)=>{
  return res.render('signup');
});
router.get("/login",(req,res)=>{
  return res.render('login');
});



module.exports=router;