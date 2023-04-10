const nodemailer= require('nodemailer');
const ejs=require('ejs');
const path=require('path');




// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service:'gmail', 
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'kapil07092000@gmail.com', // generated ethereal user
      pass: 'dupd vdmq xuvf emfr', // generated ethereal password
    },
  });
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