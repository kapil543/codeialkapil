const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log',{
  interval :'1d',
  path:logDirectory
});

const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:'gmail', 
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'kapil07092000@gmail.com', // generated ethereal user
          pass: 'dupd vdmq xuvf emfr', // generated ethereal password
        },
      },
    google_client_id:"1084317491978-5v0bcvkoic6b9g7pe90629svk52lc03d.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
      mode:'dev',
      options:{stream:accessLogStream}
    }
}
const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail', 
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
          pass: process.env.CODEIAL_GMAIL_PASSWORD, // generated ethereal password
        },
      },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
      mode:'combined',
      options:{stream:accessLogStream}
    }
}
module.exports= eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports=development;