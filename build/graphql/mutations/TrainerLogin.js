"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trainerLogin = void 0;

var _schema = require("@nexus/schema");

var _nexus = require("nexus");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var trainerLogin = (0, _schema.mutationField)('trainerLogin', {
  type: 'AuthPayload',
  args: {
    email: _nexus.schema.stringArg({
      nullable: false
    }),
    password: _nexus.schema.stringArg({
      nullable: false
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_parent, _ref, ctx) {
      var email, password, user, passwordValid;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              email = _ref.email, password = _ref.password;
              _context.next = 3;
              return ctx.prisma.user.findOne({
                where: {
                  email: email.toLowerCase()
                }
              });

            case 3:
              user = _context.sent;

              if (!(user.role !== 'trainer')) {
                _context.next = 6;
                break;
              }

              throw new Error("Utente non abilitato");

            case 6:
              _context.next = 8;
              return (0, _bcryptjs.compare)(password, user.password);

            case 8:
              passwordValid = _context.sent;

              if (passwordValid) {
                _context.next = 11;
                break;
              }

              throw new Error('Invalid password');

            case 11:
              return _context.abrupt("return", {
                token: (0, _jsonwebtoken.sign)({
                  userId: user.id
                }, process.env.APP_SECRET),
                user: user
              });

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
exports.trainerLogin = trainerLogin;