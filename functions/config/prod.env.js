const secrets = require('./secrets');

module.exports = {
  mailgun: secrets.mailgun.prod,
  send: true,
};
