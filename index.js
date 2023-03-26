const express=require("express");
const cookieParser = require("cookie-parser");
const app=express();
const port=8000;
//use mongodb
const db=require('./config/mongoose.js');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
app.use(express.urlencoded());
app.use(cookieParser());

// note:use layout before route
const expressLayouts=require("express-ejs-layouts");
 
app.use(expressLayouts);
 
// note:use static-file before route
app.use(express.static("./assets"));
 
// set up the view engine
app.set("view engine","ejs"); 
app.set("views","./views");
app.use(express.static("assets"));
//  extract style and scripts from sub page into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);
app.use(session({
    name:'codeial',
    // todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {   mongoUrl: 'mongodb://127.0.0.1/codeial_development',
            autoRemove:"disabled"
        },
        function(err){
            console.log(err||"connect-mongodb setup ok");
        }
    )
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use("/",require("./routes"));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});