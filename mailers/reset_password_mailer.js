const nodeMailer=require('../config/nodemailer');

// this is another way of exporting a mothod

exports.resetPassword=async function(data){
    console.log('inside newcomment mailer');
    try{
        let htmlString=await nodeMailer.renderTemplate({resetUrl:data.resetUrl},'/password/reset_password.ejs');

        let info = await nodeMailer.transporter.sendMail({
            from: ' kapilcodeial.in', // sender address
            to:  data.email, // list of receivers
            subject: " Reset password!", // Subject line
            text: "Hello world?", // plain text body
            html: htmlString // html body
          });
        // console.log('Message sent',info);
    }catch(err){
        console.log('err in sending mail',err);
        return ;
    }
     
     
}