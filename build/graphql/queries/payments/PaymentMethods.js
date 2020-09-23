"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentMethods = void 0;

var _schema = require("@nexus/schema");

var _stripe = require("../../../stripe");

var _costants = require("../../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var paymentMethods = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.field('paymentMethods', {
      type: _costants.JSONScalar,
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_parent, args, ctx) {
          var user, paymentMethods;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return ctx.prisma.user.findOne({
                    where: {
                      id: ctx.userId
                    }
                  });

                case 2:
                  user = _context.sent;

                  if (user) {
                    _context.next = 5;
                    break;
                  }

                  throw new Error("Non autorizzato");

                case 5:
                  _context.next = 7;
                  return _stripe.stripe.paymentMethods.list({
                    customer: user.customerId,
                    type: 'card'
                  });

                case 7:
                  paymentMethods = _context.sent;
                  return _context.abrupt("return", paymentMethods);

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
  }
});
exports.paymentMethods = paymentMethods;