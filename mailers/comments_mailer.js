const nodeMailer=require('../config/nodemailer');

// this is another way of exporting a mothod

exports.newComment=async function(comment){
    // console.log(comment);
    console.log('inside newcomment mailer');
    try{
        let htmlString=await nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
        // console.log(comment);
        let info = await nodeMailer.transporter.sendMail({
            from: ' kapilcodeial.in', // sender address
            to: comment.user.email, // list of receivers
            subject: "new comment published !", // Subject line
            text: "Hello world?", // plain text body
            html: htmlString // html body
          });
        // console.log('Message sent',info);
    }catch(err){
        console.log('err in sending mail',err);
        return ;
    }
     
     
}