"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socialLinking = void 0;

var _schema = require("@nexus/schema");

var _nexus = require("nexus");

var _facebookAuth = require("../../utils/facebookAuth");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var socialLinking = (0, _schema.extendType)({
  type: 'Mutation',
  definition: function definition(t) {
    t.field('facebookDisconnect', {
      type: 'User',
      resolve: function resolve(parent, args, ctx) {
        if (!ctx.userId) {
          throw new Error('Utente non trovato');
        }

        return ctx.prisma.user.update({
          data: {
            facebookId: null
          },
          where: {
            id: ctx.userId
          }
        });
      }
    });
    t.field('facebookConnect', {
      type: 'User',
      args: {
        fbToken: _nexus.schema.stringArg({
          nullable: false
        })
      },
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2) {
          var fbToken, req, res, prisma, userId, _yield$authenticateFa, data, info, user;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fbToken = _ref.fbToken;
                  req = _ref2.req, res = _ref2.res, prisma = _ref2.prisma, userId = _ref2.userId;
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
                    _context.next = 15;
                    break;
                  }

                  _context.next = 12;
                  return prisma.user.update({
                    where: {
                      id: userId
                    },
                    data: {
                      facebookId: data.profile.id
                    }
                  });

                case 12:
                  user = _context.sent;

                  if (!user) {
                    _context.next = 15;
                    break;
                  }

                  return _context.abrupt("return", user);

                case 15:
                  if (!info) {
                    _context.next = 22;
                    break;
                  }

                  console.log(info);
                  _context.t0 = info.code;
                  _context.next = _context.t0 === 'ETIMEDOUT' ? 20 : 21;
                  break;

                case 20:
                  return _context.abrupt("return", new Error('Failed to reach Facebook: Try Again'));

                case 21:
                  return _context.abrupt("return", new Error('something went wrong'));

                case 22:
                  return _context.abrupt("return", Error('server error'));

                case 25:
                  _context.prev = 25;
                  _context.t1 = _context["catch"](3);
                  return _context.abrupt("return", _context.t1);

                case 28:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[3, 25]]);
        }));

        function resolve(_x, _x2, _x3) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    });
  }
});
exports.socialLinking = socialLinking;