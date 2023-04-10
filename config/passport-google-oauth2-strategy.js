const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const { error } = require('console');

// tell passport to use new strategy for google login
passport.use(new googleStrategy({
        clientID:"1084317491978-5v0bcvkoic6b9g7pe90629svk52lc03d.apps.googleusercontent.com",
        
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    // find a user
     
    async function(accessToken, refreshToken, profile, done){
        try {
            const  user =await User.findOne({email:profile.emails[0].value})
            // console.log("goo;eadf;",profile,"kapil:",user);
            // if found ,set this user req.user
            if(user){
                return done(null,user);
            }else{
                // if not found ,create the user and set it as req.user
                 const newuser= await User.create({
                                    name:profile.displayName,
                                    email:profile.emails[0].value,
                                    password:crypto.randomBytes(20).toString('hex')
                                    });
                if(newuser){
                    return done(null,newuser);
                }else{
                    console.log("error in creating user google-strategy-passport");
                    return ;
                }
                    
            }
        }catch(err){
            console.log("error in google-strategy-passport", err);
            return ;
        }
         
    }
))
module.exports=passport;
