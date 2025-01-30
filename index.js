const express=require('express');
const { connectMongoDB } = require('./connect');
const urlRoute=require('./routes/url');
const staticRoute=require("./routes/staticRouter");

const userRoute=require("./routes/user");
const URL=require("./models/url");
const cookieParser=require("cookie-parser");
const path=require('path');
// const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth');
const { checkForAuthentication,restrictTo } = require('./middleware/auth');

const Port=8000;
const app=express();
  
//telling epress that we are going to used ejs template engine
app.set('view engine','ejs');
//where to look for ejs file
app.set('views',path.resolve("./views"));

//middleware////////
app.use(express.json());
app.use(express.urlencoded({extended:false}));//accept both form and json data
app.use(cookieParser());
app.use(checkForAuthentication)

//route
app.use('/url',restrictTo(["normal",'admin']),urlRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);

//get route 
app.get("/:shortId",async(req,res)=>{
  const shortId=req.params.shortId;
 const entry=await URL.findOneAndUpdate({
    shortId
  },{
    $push:{
      visitHistory:{
        timestamp:Date.now(),
      }
    }
  })

  if(!entry){
    return res.status(404).send("url is not found");
  }
  res.redirect(entry.redirectURL);
})


connectMongoDB();
app.listen(Port,()=>{
  console.log(`app running on the port ${Port}`);
})