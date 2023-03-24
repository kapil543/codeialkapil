module.exports.home=function(req,res){
    // return res.end("<h1>Express is up for codeial!</h1>");
    console.log(req.cookies);
    res.cookie(11,'s');
    return res.render("home",{
        title:"Home",
    });
}
// module.exports.function_name=function(req,res){return res.end("<h1>manisha</h1>")};