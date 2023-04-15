const { populate } = require('../models/post');

const Post=require('../models/post');
const User=require('../models/user');
const Friendship=require('../models/friendship');
module.exports.home= async function(req,res){
    // return res.end("<h1>Express is up for codeial!</h1>");
    // console.log(req.cookies);
    // res.cookie(11,'s');
    try{
         const posts=await Post.find({})
        .sort('-createdAt')
        .populate('user').populate('likes')
        .populate({
            path:'comments',
            populate:{
                path:'user',
                model:"User"
            }
        }) ;
    //    await console.log(posts[0]);
        const users=await User.find({}) 
        let all_friends;
        if(req.user){
            let user=await User.findOne({_id:req.user.id})
            .populate({
                path:'friendships'
            }); 
             
             all_friends=user.friendships;
            //  console.log(user);
        }
         
        return res.render("home",{
            title:"Codeial | Home",
            posts:posts,
            all_users:users,
            all_friends:all_friends
        });

    }catch(err){
        console.log('err in fatching posts',err);
        return;
    }
     
}
// module.exports.function_name=function(req,res){return res.end("<h1>manisha</h1>")};