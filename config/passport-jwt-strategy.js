const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User=require('../models/user');

var opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial'
};
passport.use(new JWTStrategy(opts, async function(jwtPayload, done) {
    try{
        const user=await User.findById(jwtPayload._id);
             
             
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        
    }catch(err){
            console.log("error in jwt:", err);
            return done(err, false);
    }
     
}));

module.exports=passport;
