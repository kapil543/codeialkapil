const Comment=require('../models/comment');
const Post=require('../models/post');
const commmentMailer=require('../mailers/comments_mailer');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue=require('../config/kue'); 

module.exports.create=async function(req,res){
    try{
        const post=await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            await post.comments.push(comment);
            await post.save();
            comment=await comment.populate('user','name email');
            let job=await queue.create('emails',comment).save(function(err){
                if(err){
                    console.log(err);
                };
                console.log('job enqueued',job.id);
            })
            if(req.xhr){
                // Similar for comments to fetch the user's id!
                // comment=await comment.populate('user','name email');

                // commmentMailer.newComment(comment);
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:"Post created!"
                })
            }
            req.flash('success',"Comment published  successfully!");
            res.redirect('/');
        }
    }catch(err){
        console.log('error in creating comment on post:',err);
    }
};
module.exports.destroy=async function(req,res){
    try{
        const comment=await Comment.findById(req.params.id);
        // .id means converting the object id(_id) into string
         
        if(comment.user==req.user.id){
          let postId=comment.post;
          await Comment.deleteOne({_id:comment._id});
          let post=await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
          
          //send the comment id which was deleted back to the views
          if(req.xhr){
            return res.status(200).json({
                data:{
                    comment_id:req.params.id 
                },
                message:'Post deleted'
            });
          }
          req.flash('success','Comment deleted!');
          return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('err in destroying post',err);
        return;
    }
};    