const secrets = require('./secrets');

module.exports = {
  mailgun: secrets.mailgun.dev,
  send: false,
};
