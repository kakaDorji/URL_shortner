const express=require('express');
const { handleUserSignUp, handleuserLogin } = require('../controller/user');
const router=express.Router();

router.post('/',handleUserSignUp);
router.post('/login',handleuserLogin);



module.exports=router;