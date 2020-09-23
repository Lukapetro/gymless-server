"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmUser = void 0;

var _schema = require("@nexus/schema");

var _jsonwebtoken = require("jsonwebtoken");

var _costants = require("../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var confirmUser = (0, _schema.mutationField)('confirmUser', {
  type: 'Boolean',
  args: {
    token: (0, _schema.stringArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var token, verifiedToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = _ref.token;
              //verifico il token
              verifiedToken = (0, _jsonwebtoken.verify)(token, process.env.APP_SECRET); //Errore se non c'è o se è scaduto

              if (!(!verifiedToken || verifiedToken.tokenType !== _costants.tokenTypeConfirmation || !verifiedToken.userId)) {
                _context.next = 4;
                break;
              }

              throw new Error('Token non valido');

            case 4:
              _context.next = 6;
              return ctx.prisma.user.update({
                data: {
                  confirmed: true
                },
                where: {
                  id: verifiedToken.userId
                }
              });

            case 6:
              _context.next = 8;
              return ctx.prisma.token["delete"]({
                where: {
                  token: token
                }
              });

            case 8:
              return _context.abrupt("return", true);

            case 9:
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
exports.confirmUser = confirmUser;