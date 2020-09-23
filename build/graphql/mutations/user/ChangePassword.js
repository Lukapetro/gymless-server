"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePassword = void 0;

var _schema = require("@nexus/schema");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _costants = require("../../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var changePassword = (0, _schema.mutationField)('changePassword', {
  type: 'User',
  args: {
    password: (0, _schema.stringArg)({
      required: true
    }),
    token: (0, _schema.stringArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var password, token, verifiedToken, hashedPassword;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              password = _ref.password, token = _ref.token;
              //verifico il token
              verifiedToken = (0, _jsonwebtoken.verify)(token, process.env.APP_SECRET); //Errore se non c'è, di topo sbagliato oppure è scaduto

              if (!(!verifiedToken || verifiedToken.tokenType !== _costants.tokenTypeReset || !verifiedToken.userId)) {
                _context.next = 4;
                break;
              }

              throw new Error('Token non valido');

            case 4:
              _context.next = 6;
              return (0, _bcryptjs.hash)(password, 10);

            case 6:
              hashedPassword = _context.sent;
              _context.next = 9;
              return ctx.prisma.token["delete"]({
                where: {
                  token: token
                }
              });

            case 9:
              return _context.abrupt("return", ctx.prisma.user.update({
                data: {
                  password: hashedPassword
                },
                where: {
                  id: verifiedToken.userId
                }
              }));

            case 10:
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
exports.changePassword = changePassword;