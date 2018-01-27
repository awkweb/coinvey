const path = require('path');
const functions = require('firebase-functions');
const Email = require('email-templates');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const env = process.env.NODE_ENV === 'development'
  ? require('./config/dev.env')
  : require('./config/prod.env');


const mailgunAuth = {
  auth: {
    api_key: env.mailgun.key,
    domain: env.mailgun.domain,
  },
};
const mailgunNodemailer = nodemailer.createTransport(mg(mailgunAuth));
const email = new Email({
  message: {
    from: 'hello@coinvey.co',
  },
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      images: 75,
      relativeTo: path.join(__dirname, 'emails', 'assets'),
    },
  },
  send: env.send,
  transport: mailgunNodemailer,
  views: {
    options: {
      extension: 'mustache',
    },
  },
});

exports.sendOrderConfirmation = functions.firestore
  .document('customers/{userID}')
  .onCreate((event) => {
    const data = event.data.data();
    const sender = data.sender;
    const recipient = data.recipient;
    const locals = {
      senderName: sender.name.first,
      recipient,
    };
    const options = {
      template: 'confirmation',
      message: {
        subject: 'merp',
        to: recipient.email,
      },
      locals,
    };
    return email
      .send(options)
      .then(console.log)
      .catch(console.error);
  });
