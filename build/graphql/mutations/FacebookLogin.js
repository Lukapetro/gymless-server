"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookLogin = void 0;

var _nexus = require("nexus");

var _jsonwebtoken = require("jsonwebtoken");

var _schema = require("@nexus/schema");

var _facebookAuth = require("../../utils/facebookAuth");

var _stripe = require("../../stripe");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var facebookLogin = (0, _schema.mutationField)('facebookLogin', {
  type: 'AuthPayload',
  args: {
    fbToken: _nexus.schema.stringArg({
      nullable: false
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, _ref2) {
      var fbToken, req, res, prisma, _yield$authenticateFa, data, info, userExist, customer, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fbToken = _ref.fbToken;
              req = _ref2.req, res = _ref2.res, prisma = _ref2.prisma;
              req.body = _objectSpread(_objectSpread({}, req.body), {}, {
                access_token: fbToken
              });
              _context.prev = 3;
              _context.next = 6;
              return (0, _facebookAuth.authenticateFacebook)(req, res);

            case 6:
              _yield$authenticateFa = _context.sent;
              data = _yield$authenticateFa.data;
              info = _yield$authenticateFa.info;

              if (!data) {
                _context.next = 23;
                break;
              }

              _context.next = 12;
              return prisma.user.findOne({
                where: {
                  email: data.profile._json.email
                }
              });

            case 12:
              userExist = _context.sent;

              if (!userExist) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", {
                token: (0, _jsonwebtoken.sign)({
                  userId: userExist.id
                }, process.env.APP_SECRET),
                user: userExist
              });

            case 15:
              _context.next = 17;
              return _stripe.stripe.customers.create({
                name: data.profile.displayName,
                email: data.profile._json.email.toLowerCase()
              });

            case 17:
              customer = _context.sent;
              _context.next = 20;
              return prisma.user.upsert({
                where: {
                  email: data.profile._json.email
                },
                update: {
                  facebookId: data.profile.id
                },
                create: {
                  name: data.profile._json.first_name,
                  surname: data.profile._json.last_name,
                  email: data.profile._json.email,
                  customerId: customer.id,
                  lastLoggedIn: new Date(),
                  password: '',
                  facebookId: data.profile.id
                }
              });

            case 20:
              user = _context.sent;

              if (!user) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", {
                token: (0, _jsonwebtoken.sign)({
                  userId: user.id
                }, process.env.APP_SECRET),
                user: user
              });

            case 23:
              if (!info) {
                _context.next = 30;
                break;
              }

              console.log(info);
              _context.t0 = info.code;
              _context.next = _context.t0 === 'ETIMEDOUT' ? 28 : 29;
              break;

            case 28:
              return _context.abrupt("return", new Error('Failed to reach Facebook: Try Again'));

            case 29:
              return _context.abrupt("return", new Error('something went wrong'));

            case 30:
              return _context.abrupt("return", Error('server error'));

            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](3);
              return _context.abrupt("return", _context.t1);

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 33]]);
    }));

    function resolve(_x, _x2, _x3) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
exports.facebookLogin = facebookLogin;