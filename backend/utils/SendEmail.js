const nodeMailer = require('nodemailer')
const sendEmail = async (options) => {
    
    let transporter = nodeMailer.createTransport({
        service:process.env.NODE_MAILER_SERVICE,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.NODE_MAILER_EMAIL, // generated ethereal user
          pass: process.env.NODE_MAILER_PASSWORD, // generated ethereal password
        },
      });
    let info = await transporter.sendMail({
        from: process.env.NODE_MAILER_EMAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    });
}

module.exports = sendEmail