const Post=require('../models/post');
const Comment=require('../models/comment');
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
module.exports.destroy=async function(req,res){
    try{
        const post=await Post.findById(req.params.id);
        // .id means converting the object id(_id) into string
         
        if(post.user==req.user.id){
          await Post.deleteOne({_id:post._id});
          await Comment.deleteMany({post:req.params.id});
          return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('err in destroying post',err);
        return;
    }
}    