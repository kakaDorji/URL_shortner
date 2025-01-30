const{getUser}=require('../services/auth');

function checkForAuthentication(req,res,next){
  // const authorizationHeaderValue=req.headers['authorization'];
  // req.user=null;
  // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
  //   return next();
  
  // const token=authorizationHeaderValue.split("Bearer ")[1];
  // const user=getUser(token);
  const tokenCookie=req.cookies?.token;
  res.user=null;
  if(!tokenCookie) return next();
  const token=tokenCookie;
  const user=getUser(token);
  req.user=user;
  return next();

}
//restrict

function restrictTo(roles=[]){
  return function(req,res,next){
    if(!req.user) return res.redirect('/login');
    if(!roles.includes(req.user.role)) return res.end("unauthorized");
    return next();
  }
}
module.exports={
  checkForAuthentication,restrictTo
}


// async function restrictToLoggedinUserOnly(req,res,next){
//   // const userId=req.cookies?.uid;

//   // if(!userId) return res.render('/login');
//   // const user=await getUser(userId);
//   // if(!user) return res.redirect('/login');

//   const userUid=req.headers["Authorization"];
//   if(!userUid) return res.redirect('/login');
//   const token=userUid.split('Bearer ')[1];
//   const user=await getUser(token);
//   req.user=user;
//   next();
// }
// async function checkAuth(req,res,next){
//   // const userId=req.cookies?.uid;
//   // const user=await getUser(userId);
//   const userId=req.headers["authorization"];
//   const token=userId.split('Bearer ')[1];
//   const user=await getUser(token);
//   req.user=user;
//   next();
// }


// module.exports={
//   restrictToLoggedinUserOnly,checkAuth
// }
