const nodemailer = require('nodemailer');
const EmailTemplate = require('./EmailTemplate.js');


let transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

const mailOptions = (from, to, subject, html) => {
    return ({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
};
const sendEmail = async(to, type, data) => {
    const template = EmailTemplate(type, data);
    const mailInfor = mailOptions('developer.opendevzone@gmail.com',to, template.title, template.content);
    await transporterGmail.sendMail(mailInfor, function(error, info){
        if (error) {
          return false;
        } else {
          return true;
        }
      });
}
module.exports = sendEmail;