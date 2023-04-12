const mongoose=require('mongoose');


const resetPasswordSchema=new mongoose.Schema({
    
    accessToken: {
      type:String  
    },
    // token belongs to a user 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isValid: {
        type:Boolean,
        default:true
    }
});
const ResetPassword=mongoose.model('ResetPassword',resetPasswordSchema);
module.exports=ResetPassword;