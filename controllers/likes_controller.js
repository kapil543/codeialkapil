const Like=require('../models/like');
const Post=require('../models/post');
const Comment=require('../models/comment');


module.exports.toggleLike=async function(req,res){
    try{
        // likes/toggle/?id=asklsdjf&type=Post
        let likeable;
        let deleted=false;

        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }
        // check if like is already exist
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });
        // if a like already exists then delete it
        if(existingLike){
            console.log('1');
            likeable.likes.pull(existingLike._id);
            console.log('2');
            likeable.save();
            console.log('3');
            await Like.deleteOne({_id:existingLike._id});
            // existingLike.remove();
            console.log('4');
            deleted=true;
        }else{
            // else make a new like 
            let newLike=await Like.create({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message:'Request successfull',
            data:{
                deleted:deleted
            }
        });
    }catch(err){
        console.log("err at like_controller",err);
        return res.status(500).json({
            message:'Internal server error '
        });    
    }
};