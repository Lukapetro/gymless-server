"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forgotPassword = void 0;

var _schema = require("@nexus/schema");

var _generateToken = require("../../utils/generateToken");

var _sendEmail = require("../../utils/sendEmail");

var _costants = require("../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var forgotPassword = (0, _schema.mutationField)('forgotPassword', {
  type: 'Boolean',
  args: {
    email: (0, _schema.stringArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var email, user, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              email = _ref.email;
              _context.next = 3;
              return ctx.prisma.user.findOne({
                where: {
                  email: email
                }
              });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", true);

            case 6:
              //genero e salvo il token
              token = (0, _generateToken.generateToken)(user.id, _costants.tokenTypeReset);
              _context.next = 9;
              return ctx.prisma.token.create({
                data: {
                  token: token
                }
              });

            case 9:
              _context.next = 11;
              return (0, _sendEmail.sendEmail)(email, "".concat(process.env.AMBIENTE, "/user/change-password/").concat(token), 'Rispristina password', 'Clicka sul seguente link per ripristinare la tua password');

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
exports.forgotPassword = forgotPassword;