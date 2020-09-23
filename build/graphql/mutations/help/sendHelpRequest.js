"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendHelpRequest = void 0;

var _schema = require("@nexus/schema");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sendHelpRequest = (0, _schema.mutationField)('sendHelpRequest', {
  type: 'Boolean',
  args: {
    message: (0, _schema.stringArg)()
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var message, user, transporter, mailOptions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              message = _ref.message;
              _context.next = 3;
              return ctx.prisma.user.findOne({
                where: {
                  id: ctx.userId
                }
              });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 6;
                break;
              }

              throw new Error('Utente non trovato');

            case 6:
              console.log('user :>> ', user.email);
              transporter = _nodemailer["default"].createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASSWORD
                }
              });
              mailOptions = {
                from: "\"Centro assistenza \u26D1\uFE0F",
                to: 'infogymless@gmail.com',
                subject: 'Centro Assistenza',
                text: "".concat(message),
                html: "<div>\n      <p>Da: ".concat(user.name, " -  ").concat(user.email, "</p>\n      <div>Messaggio: ").concat(message, "</div></div>")
              };
              _context.next = 11;
              return transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });

            case 11:
              return _context.abrupt("return", true);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function resolve(_x, _x2, _x3) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
exports.sendHelpRequest = sendHelpRequest;