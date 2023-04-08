const nodemailer = require('nodemailer');


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
    await transporter.sendMail(mailOptions(transporterGmail.auth.user,to,  ), function(error, info){
        if (error) {
          return false;
        } else {
          return true;
        }
      });
}