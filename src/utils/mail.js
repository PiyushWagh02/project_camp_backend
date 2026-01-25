import { text } from "express"
import Mailgen from "mailgen"

import nodemailer from  'nodemailer'

const sendEmail = async (options) =>{
    const mailGenerator = new Mailgen({
        theme:"default",
        product:{
            name:"Task Managaer",
            link:"https://taskmanagelink.com"
        }
    })

 const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
const emailHtml = mailGenerator.generate(options.mailgenContent);



   const transporter = nodemailer.createTransport({
    host:process.env.MAILTRAP_SMTP_HOST,
    port:process.env.MAILTRAP_SMTP_PORT,
    auth:{
        user:process.env.MAILTRAP_SMTP_USER,
        pass:process.env.MAILTRAP_SMTP_PASS
    }

   })

   const mail ={
    from:"mail.taskmanager@example.com",
    to:options.email,
    subject:options.subject,
    text:emailTextual,
    html:emailHtml
   }


   try{
    await transporter.sendEmail(mail)
   }catch(error){
      console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credentials in .env file");
      console.error(error);
   }



   
}




const emailVerificationMailgenContent= (username,
    verificationUrl) => {
        return {
            body:{
                name:username,
                intro: "Welcome to our App! we're Exited to have you on board",
                action:{
                    instructions: "To verify your email please click on the following button",
                    button:{
                        color: "#22BC66",
                        text : "Verify your email",
                        link : verificationUrl
                    },
                },
                outro: "Need help, or have questions? Just reply to this mail, we'd love to help. ",
            },
        };
    }


    const forgotPasswordMailgenContent= (username,
    passwordResetUrl) => {
        return {
            body:{
                name:username,
                intro: "we got a request to reset the password of your accout",
                action:{
                    instructions: "To reset your password click on the following link",
                    button:{
                        color: "#043017",
                        text : "Verify your email",
                        link : "passwordResetUrl"
                    },
                },
                outro: "Need help, or have questions? Just reply to this mail, we'd love to help. ",
            },
        };
    }


    export {
        emailVerificationMailgenContent,
        forgotPasswordMailgenContent,
        sendEmail
    }