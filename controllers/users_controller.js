 const { findById } = require('../models/post');
const User=require('../models/user');
const Crypto=require('crypto');
const resetPassword=require('../models/reset_password_token');
const fs=require('fs');
const path=require('path');
const commmentMailer=require('../mailers/reset_password_mailer');
const commentEmailWorker=require('../workers/reset_password_worker');
const queue=require('../config/kue'); 


 module.exports.profile= async function(req,res){
    const user=await User.findById(req.params.id);
    return res.render("user_profile",{
      title:'User profile',
      profile_user:user
    });
 };
 module.exports.update=async function(req,res){
   if(req.user.id==req.params.id){
      let user=await User.findByIdAndUpdate(req.params.id,req.body);
      //we can read data by using this function
      User.uploadedAvatar(req,res,function(err){
         if(err){console.log('******Multer Error',err)}
         user.name=req.body.name;
         user.email=req.body.email;
         if(req.file){
            // for deleting privius profile pic
            if(user.avatar){
               if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                  fs.unlinkSync(path.join(__dirname,'..',user.avatar));
               }
               
            }
            // this is saving the path of the uploaded file into the avatar filed in the user
            user.avatar= User.avatarPath+'/'+req.file.filename;
         }
         user.save();
         return res.redirect('back');
      });
   }else{
      req.flash('error','Unauthorized !');
      return res.status(401).send('unauthorized');
   }
 }
//  render the sign up page
 module.exports.signUp=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
    return res.render("user_sign_up",{
      title:"Codeial | Sign Up"
   });
 };
//  render the sign in page
 module.exports.signIn=function(req,res){
   if(req.isAuthenticated()){
      return res.redirect('/users/profile');
   }
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
   console.log ("create session"); 
   req.flash('success','Logged in successfully');
return res.redirect('/');

};
//  forget password
module.exports.forgetPassword=function(req,res){
   console.log ("forget Password"); 

   req.flash('success','Forget Password');
   return res.render("user_forget_password",{
      title:'User profile'
    });
};
//find user by email for sending reset password link
module.exports.resetPasswordEmail=async (req,res)=>{
   try{
      console.log(req.body.email);
      const findUserEmail=await User.findOne({email:req.body.email});
      // console.log(findUserEmail);
      if(findUserEmail){
         const token= Crypto.randomBytes(20).toString('hex');
         console.log(token);
         const resetToken= await resetPassword.create({
            user:findUserEmail._id,
            accessToken:token
         });
         console.log(resetToken);
         const resetUrl=`http://localhost:8000/users/reset-password/${token}`;

         let data={
            resetUrl:resetUrl,
            email:req.body.email
         }
         let job=await queue.create('emails', data ).save(function(err){
            if(err){
                console.log(err);
            };
            console.log('job enqueued',job.id);
        })
               
               req.flash('success',' Email user found');
               console.log(findUserEmail)
            return res.redirect("back");
      }else{
            req.flash('error',' Email not found');
            return res.redirect("back");
      }
   }catch(error){
      console.log('err in finding user in reset password:',error);
      return res.redirect("back");
   }
};
//  reset password form page for new password
module.exports.resetPassword=function(req,res){
   console.log ("Reset Password"); 

   // req.flash('success','Reset Password');
   return res.render("user_reset_password",{
      title:'User profile',
      token: req.params.token
    });
};
// complete reset password by submiting form
module.exports.resetPasswordComplete= async function(req,res){
   try{
      const userToken=await resetPassword.findOne({accessToken:req.params.token});
      if(userToken){
         // if(userToken.isValid){
            if(req.body.password==req.body.confirm_password){
               let user=await User.findByIdAndUpdate(userToken.user,req.body);
               user.save()
            }else{
               req.flash('error'," password is not equal to confirm_password");
               return res.redirect("back");
            }
            // delete token after reseting password
            await resetPassword.findOneAndDelete({accessToken:req.params.token});
            return res.redirect("/");
         // }else{
         //    console.log("Reset link is expired ");
         //    req.flash('error',"Reset link is expired ");
         //    return res.redirect("back");
         // }
      }else{
         req.flash('error'," Token is not found ");
         return res.redirect("back");
      }
       
   }catch(err){
      console.log('err in reseting password:',error);
      return res.redirect("back");
   }
};

module.exports.destroySession=function (req,res,next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','You are logged Out');
      return res.redirect('/');
    });
    
};
 
