const functions = require('firebase-functions');
const mailgun = require('mailgun.js');
const secrets = require('./secrets');

const MG = mailgun.client({
  username: 'api',
  key: secrets.mailgun.key,
});

exports.sendOrderConfirmation = functions.firestore
  .document('customers/{userID}')
  .onCreate((event) => {
    const data = event.data.data();
    const sender = data.sender;
    const from = `${sender.name.first} ${sender.name.last} <${sender.email}>`;
    const to = [data.recipient.email];
    const subject = `${sender.name.first} just sent you $${data.amount} of ${data.coin.toUpperCase()} from Coinvey!`;
    const text = 'Click here to get your coins :)';
    const html = `
      <h1>This email needs some TLC</h1>
      <p>${data.note}</p>
      <a href="https://coinvey.firebaseapp.com/">click here to claim your coins...</a>
    `;
    const mgData = {
      from,
      to,
      subject,
      text,
      html,
    };
    return MG
      .messages
      .create(secrets.mailgun.domain, mgData)
      .then(msg => console.log(msg))
      .catch(err => console.error(err));
  });
