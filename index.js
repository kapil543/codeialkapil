const express=require("express");
const env=require('./config/environment')
const logger=require("morgan");

const cookieParser = require("cookie-parser");
const app=express();
require('./config/view-helpers')(app);
const port=8000;
//use mongodb
const db=require('./config/mongoose.js');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy.js');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');
// setup the chat server to be used with socket.io
// var http = require('http').Server(app);
// var io = require('socket.io')(http,  { cors: { origin: '*' } });
// const { Server } = require("socket.io");

// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// io.on("connection", (socket) => {
//   // ...
// });
 // In your main file (e.g. app.js)
// import http from 'http';
// import express from 'express';
// const app = express();
// const server = http.createServer(app);
// // Pass the server to the chat_sockets module to set up chat sockets
// import { chatSockets } from './config/chat_sockets';
// chatSockets(server);

const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is running on port 5000');
const path=require('path');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(logger(env.morgan.mode, env.morgan.options))
// note:use layout before route
const expressLayouts=require("express-ejs-layouts");

app.use(expressLayouts);
 
// note:use static-file before route
app.use(express.static("./assets"));
 
// set up the view engine
app.set("view engine","ejs"); 
app.set("views","./views");
app.use(express.static(env.asset_path));
// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
//  extract style and scripts from sub page into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);
app.use(session({
    name:'codeial',
    // todo change the secret before deployment in production mode
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use("/",require("./routes"));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on port:${port}`);
});