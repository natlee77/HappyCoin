// import sgMail from '@sendgrid/mail';//dont work
import nodemailer from 'nodemailer';
// const apiKey =process.env.KEY_SENDGRID;
// sgMail.setApiKey(apiKey);
 

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host:process.env.SMTP_HOST,//'smtp.gmail.com',
      port: 587,
      // secure: false,
      // requireTLS: true,
      auth: {
        user: process.env.SMTP_SENDER,//'natlisjo@gmail.com',
        pass: process.env.SMTP_PASSWORD,//'nata1234',
        // naturally, replace both with your real credentials or an application-specific password
      },
    })
   const mail = {
     from:`'natlisjo@gmailcom'<${process.env.SMTP_SENDER}>` ,
     to: options.recipient,
     subject: options.subject,
     text: options.message,
     // html: '<h1></h1>'
   } 
    // const mail = {
    //   to: options.recipient,
    //   from: 'natlisjo@gmail.com',//should be varifyed, with maildelivery service
    //   subject: options.subject,
    //   text: options.message,
    //   // html: '<h1></h1>'
    // };

    // const response = await sgMail.send(mail);
   
  } catch (error) {
    throw new Error(`Can not send email ${error}`);
  }
};
