const Post=require('../models/post')
module.exports.create= async function(req,res){
    try{
        post=await Post.create({
            content:req.body.content,
            user:req.user._id
         });
         return res.redirect('back');
    }catch(err){
         console.log('err in creating a post');
         return;
    }
     
};              