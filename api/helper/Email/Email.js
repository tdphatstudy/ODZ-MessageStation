const nodemailer = require('nodemailer');
const EmailTemplate = require('./EmailTemplate.js');


let transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'developer.opendevzone@gmail.com',
      pass: 'ahaexmofygiknwss'
    }
  });

const mailOptions = (from, to, subject, html) => {
    return ({
        from: from,
        to: to,
        subject: subject,
        text: html
    });
};
const sendEmail = async(to, type, data) => {
    const template = EmailTemplate(type, data);
    const mailInfor = mailOptions(transporterGmail.auth.user,to, template.subject, template.content);
    await transporter.sendMail(mailInfor, function(error, info){
        if (error) {
          return false;
        } else {
          return true;
        }
      });
}
module.exports = sendEmail;