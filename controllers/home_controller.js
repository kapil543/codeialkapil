const { populate } = require('../models/post');

const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res){
    // return res.end("<h1>Express is up for codeial!</h1>");
    // console.log(req.cookies);
    // res.cookie(11,'s');
    try{
         const posts=await Post.find({})
        .populate('user')
        .populate({
             
            path:'comments',
            populate:{
                path:'user'
            }
        });
        const users=await User.find({});
        return res.render("home",{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
        });

    }catch(err){
        console.log('err in fatching posts',err);
        return;
    }
     
}
// module.exports.function_name=function(req,res){return res.end("<h1>manisha</h1>")};