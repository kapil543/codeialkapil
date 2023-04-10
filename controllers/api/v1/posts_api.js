const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index= async function(req,res){

        const posts=await Post.find({})
       .sort('-createdAt')
       .populate(

                'user',
                '_id email name createdAt updatedAt __v avatar'
        )
       .populate({
           path:'comments',
           populate:{
               path:'user',
               select:'_id email name createdAt updatedAt __v avatar'
           }
       });
        

    
    return res.status(200).json({
        message:"list of posts1",
        posts:posts
    })
}
module.exports.destroy=async function(req,res){
    try{
        const post=await Post.findById(req.params.id);
        // .id means converting the object id(_id) into string
         
        if(post.user==req.user.id){
          await Post.deleteOne({_id:post._id});
          await Comment.deleteMany({post:req.params.id});
        //   if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post_id:req.params.id
        //         },
        //         message:'post deleted '
        //     });     
        //   }
        //   req.flash('success','Post and associated comments deleted !');
          return res.json(200,{message:"Post and associated Comment was  deleted !"});
        }else{
            // req.flash('error','You cannot delete this post !' );
            return res.status(401).json({message:"You cannot delete this post"});
        }
    }catch(err){
        // req.flash('error',err );
        return res.json(500,{message:"Internal server error post not found:"});
    }
}    