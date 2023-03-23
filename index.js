const express=require("express");
const app=express();
const port=8000;
// note:use layout before route
const expressLayouts=require("express-ejs-layouts");
app.use(expressLayouts);
// note:use static-file before route
app.use(express.static("./assets"));
// use express router
app.use("/",require("./routes"));
// set up the view engine
app.set("view engine","ejs"); 
app.set("views","./views");
app.use(express.static("assets"));
//  extract style and scripts from sub page into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});