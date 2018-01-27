const secrets = require('./secrets');

module.exports = {
  mailgun: secrets.mailgun.dev,
  trap: 'thom.meagher@gmail.com',
};
