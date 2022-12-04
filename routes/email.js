require('dotenv').config();
const express = require('express');
const router = express.Router();

const emailUser = process.env.nodemailer_user;
const emailPass = process.env.nodemailer_pass;
const { sendEmail } = require('../middleware/sendEmail');

router.post('/', async (req, res) => {
  let leadFullName = req.body.leadFullName;
  let leadEmail = req.body.leadEmail;
  let leadMessage = req.body.leadMessage;

  let bizEmail = 'lindsay.aiello@edocew.com';
  let emailService = 'Outlook365';
  let subject = 'Edocew Contact Form';
  let emailBody = `Lead Name: ${leadFullName}, Lead Email: ${leadEmail}
 
  Message: 
 
  ${leadMessage}
  
  --End
  `;

  try {
    let nodemailer = await sendEmail(
      emailUser,
      emailPass,
      emailService,
      bizEmail,
      subject,
      emailBody
    );

    // when auth is not working, nodemailer.responseCode will be 535
    // when auth is OK, nodemailer.responseCode will be undefined

    // nodemailer.response: 250 2.0.0 OK <CH2PR14MB4005FE869D6775CC3C284AD294129@CH2PR14MB4005.namprd14.prod.outlook.com> [Hostname=CH2PR14MB4005.namprd14.prod.outlook.com]
    // nodemailer.response: 535 5.7.139 Authentication unsuccessful, the user credentials were incorrect. [CH2PR15CA0029.namprd15.prod.outlook.com]
    console.log(nodemailer.response);
    if (nodemailer.response.includes('OK')) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem with the server, please try again later.',
    });
  }
});

module.exports = router;
