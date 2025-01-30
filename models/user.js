const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  role:{
 type:String,
 require:true,
 default:"normal",
  },
  password:{
    type:String,
    require:true
  },

},{timestamps:true})

const User=mongoose.model('user',userSchema);
module.exports=User;

