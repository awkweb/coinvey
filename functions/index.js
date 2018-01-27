const functions = require('firebase-functions');
const campaign = require('campaign');
const mailgun = require('campaign-mailgun');
const mustache = require('campaign-mustache');
const env = require('./config/dev.env');

const data = require('./test_data/send-order-confirmation');

const client = campaign({
  from: 'hello@coinvey.co',
  layout: null,
  provider: mailgun({
    apiKey: env.mailgun.key,
    authority: `https://${env.mailgun.domain}`,
  }),
  templateEngine: mustache,
  trap: env.mailgun.trap,
});

exports.sendOrderConfirmation = functions.firestore
  .document('customers/{userID}')
  .onCreate((event) => {
    const data = event.data.data();
    const sender = data.sender;
    const options = {
      subject: 'Merp',
      from: 'hello@coinvey.co',
      to: data.recipient.email,
      something: 'Merp?',
    };
    const body = require('./emails/email-confirmation.html');
    client
      .send(body, options, (err, html) => console.log('MEEEEEEEEEEP', err, html));
  });
