"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = sendTemplateEmail;

var _emailTemplates = _interopRequireDefault(require("email-templates"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function sendTemplateEmail(_ref) {
  var name = _ref.name,
      userEmail = _ref.userEmail;

  var transporter = _nodemailer["default"].createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  var email = new _emailTemplates["default"]({
    views: {
      root: __dirname
    },
    message: {
      from: 'welcome@gymless.app'
    },
    send: true,
    transport: transporter
  });
  email.send({
    template: 'confirmation',
    message: {
      to: userEmail
    },
    locals: {
      name: name
    }
  }).then(function (res) {
    console.log('res.originalMessage', res.originalMessage);
  })["catch"](console.error);
}