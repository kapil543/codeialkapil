const mongoose=require('mongoose');

const friendshipSchema=new mongoose.Schema({
    // the user who send this request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // the user who accepted this request,the naming is just to understand ,otherwise ,the users won't see a difference 
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    
},{
    timestamps:true
});
const Friendship=mongoose.model('Friendship',friendshipSchema);
module.exports=Friendship;
