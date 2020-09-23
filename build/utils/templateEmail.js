"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateEmail = templateEmail;

var _emailTemplates = _interopRequireDefault(require("email-templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function templateEmail() {
  var email = new _emailTemplates["default"]({
    message: {
      from: 'niftylettuce@gmail.com'
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: {
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    }
  });
  email.send({
    template: '../emails/mars',
    message: {
      to: 'elon@spacex.com'
    },
    locals: {
      name: 'Elon'
    }
  }).then(function () {
    console.log('Sent register email.');
  })["catch"](function (err) {
    console.error('Error sending register email: ' + err);
  });
}