"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupIntent = void 0;

var _schema = require("@nexus/schema");

var _stripe = require("../../stripe");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var setupIntent = (0, _schema.mutationField)('setupIntent', {
  type: 'String',
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var id, user, setupIntent;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
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

              throw new Error("Non autorizzato");

            case 6:
              _context.next = 8;
              return _stripe.stripe.setupIntents.create({
                customer: user.customerId
              });

            case 8:
              setupIntent = _context.sent;
              return _context.abrupt("return", setupIntent.client_secret);

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
exports.setupIntent = setupIntent;