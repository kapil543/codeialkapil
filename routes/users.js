const express=require("express");
const router=express.Router();
const passport=require('passport');
const userController=require("../controllers/users_controller");
router.get("/profile/:id",passport.checkAuthentication,userController.profile);
router.post("/update/:id",passport.checkAuthentication,userController.update);
router.get("/sign-up",userController.signUp);
router.get("/sign-in",userController.signIn);
router.post('/create',userController.create);

router.get("/forget-password",userController.forgetPassword);

router.post("/reset-password-email",userController.resetPasswordEmail);

router.get("/reset-password/:token",userController.resetPassword);

router.post("/reset-password/:token",userController.resetPasswordComplete);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
// strategy is local
    'local',
    
{failureRedirect:"/users/sign-in"}
),userController.createSession);

router.get('/sign-out',userController.destroySession);
 
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),userController.createSession);

module.exports=router;