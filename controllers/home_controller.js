const Post=require('../models/post')
module.exports.home= async function(req,res){
    // return res.end("<h1>Express is up for codeial!</h1>");
    // console.log(req.cookies);
    // res.cookie(11,'s');
    try{
        posts=await Post.find({}).populate('user');
        return res.render("home",{
            title:"Codeial | Home",
            posts:posts
        });

    }catch(err){
        console.log('err in fatching posts');
        return;
    }
     
}
// module.exports.function_name=function(req,res){return res.end("<h1>manisha</h1>")};