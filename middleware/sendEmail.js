const nodemailer = require('nodemailer');

async function sendEmail(
  emailUser,
  emailPass,
  emailService,
  bizEmail,
  subject,
  emailBody
) {
  //! nodemailer no longer takes gmail
  let transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  let mailOptions = {
    from: emailUser,
    to: bizEmail,
    subject: subject,
    text: emailBody,
  };
  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
}

module.exports.sendEmail = sendEmail;
