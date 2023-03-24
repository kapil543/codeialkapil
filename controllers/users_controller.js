 const User=require('../models/user');

 module.exports.profile=function(req,res){
    res.end("<h1>User profile</h1>");
 };
//  render the sign up page
 module.exports.signUp=function(req,res){
   return res.render("user_sign_up",{
      title:"Codeial | Sign Up"
   });
 };
//  render the sign in page
 module.exports.signIn=function(req,res){
   return res.render("user_sign_in",{
      title:"Codeial | Sign In"
   });
 };
//  get the sign up data
module.exports.create=async (req,res)=>{
   try{
      if(req.body.password!=req.body.confirm_password){
         // console.log("confirm error");
         return res.redirect("back");
      }
      const findUser=await User.findOne({email:req.body.email})
      if(!findUser){
               const userCreated=await User.create(req.body)
               if(!userCreated){
                  // console.log('err in creating user while signing up');
                  return;
               }
               else{return res.redirect('/users/sign-in')}
      }else{
            console.log("alredy user exist");
            return res.redirect("back");
      }
   }catch(error){
      console.log('err in finding user in signing up:',error);
      return;
   }
};
// module.exports.create=function(req,res){
//    if(req.body.password!=req.body.confirm_password){
//       return res.redirect("back");
//    }

//    User.findOne({email:req.body.email},function(err,user){
//       if(err){console.log('err in finding user in signing up');return}
//       if(!user){
//          User.create(req.body,function(err,user){
//             if(err){console.log('err in creating user while signing up');return}
//             return res.redirect('/users/sign-in')
//          })
//       }else{
//          return res.redirect("back");
//       }
//    })
// };
//  sign in and create a session for the user
module.exports.createSession=function(req,res){
   //   todo 
   };
