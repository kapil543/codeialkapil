const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');




// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(env.smtp);
let renderTemplate= async function(data,relativePath){
    let mailHTML;
    try{
        let template=await ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
        )
        if(template){
            mailHTML=template;
            return mailHTML;
        }
    }catch(err){
        console.log('error in rendering template:>',err);
    }
};
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}