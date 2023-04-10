const User =require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession=async function(req,res){
    try{
        const user= await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password){
            return res.status(422).json({
                message:'Invalid username password'
            });
        };
        return res.status(200).json({
            message:'sign in successfully,Here is your token keep it safe',
            data:{
                //it will set the token and send it to the user
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:1000})
            }
        });

    }catch(err){
        console.log(err);
        return res.json(500,{message:"Internal server error:",err});
    }
 
 };