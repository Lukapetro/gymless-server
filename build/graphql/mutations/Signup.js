"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = void 0;

var _nexus = require("nexus");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _schema = require("@nexus/schema");

var _stripe = require("../../stripe");

var _sendEmail = require("../../utils/sendEmail");

var _createConfirmationUrl = require("../../utils/createConfirmationUrl");

var _templateM = _interopRequireDefault(require("../../emails/templateM"));

var _costants = require("../../utils/costants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signup = (0, _schema.mutationField)('signup', {
  type: 'AuthPayload',
  args: {
    name: _nexus.schema.stringArg({
      required: true
    }),
    surname: _nexus.schema.stringArg({
      required: true
    }),
    birthDate: _costants.GQLDate,
    email: _nexus.schema.stringArg({
      nullable: false
    }),
    password: _nexus.schema.stringArg({
      nullable: false
    }),
    referrerId: _nexus.schema.intArg()
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_parent, _ref, ctx) {
      var name, surname, birthDate, email, password, referrerId, hashedPassword, customer, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = _ref.name, surname = _ref.surname, birthDate = _ref.birthDate, email = _ref.email, password = _ref.password, referrerId = _ref.referrerId;
              _context.next = 3;
              return (0, _bcryptjs.hash)(password, 10);

            case 3:
              hashedPassword = _context.sent;
              _context.next = 6;
              return _stripe.stripe.customers.create({
                name: name,
                email: email.toLowerCase()
              });

            case 6:
              customer = _context.sent;
              _context.next = 9;
              return ctx.prisma.user.create({
                data: {
                  name: name,
                  surname: surname,
                  birthDate: birthDate,
                  email: email.toLowerCase(),
                  customerId: customer.id,
                  password: hashedPassword,
                  lastLoggedIn: new Date()
                }
              });

            case 9:
              user = _context.sent;

              if (user) {
                _context.next = 12;
                break;
              }

              throw new Error("Errore nella creazione dell' utente");

            case 12:
              if (!referrerId) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return ctx.prisma.referral.create({
                data: {
                  referrer: {
                    connect: {
                      id: referrerId
                    }
                  },
                  referred: {
                    connect: {
                      id: user.id
                    }
                  }
                }
              });

            case 15:
              _context.t0 = _sendEmail.sendEmail;
              _context.t1 = email;
              _context.next = 19;
              return (0, _createConfirmationUrl.createConfirmationUrl)(user.id);

            case 19:
              _context.t2 = _context.sent;
              _context.next = 22;
              return (0, _context.t0)(_context.t1, _context.t2, 'Conferma email', 'Clicka sul seguente link per confermare la tua email');

            case 22:
              return _context.abrupt("return", {
                token: (0, _jsonwebtoken.sign)({
                  userId: user.id
                }, process.env.APP_SECRET),
                user: user
              });

            case 23:
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
exports.signup = signup;