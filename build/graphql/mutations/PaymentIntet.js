"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentIntent = void 0;

var _schema = require("@nexus/schema");

var _stripe = require("../../stripe");

var _costants = require("../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var paymentIntent = (0, _schema.mutationField)('paymentIntent', {
  type: _costants.JSONScalar,
  args: {
    amount: (0, _schema.intArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var amount, user, paymentIntent;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              amount = _ref.amount;
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
              return _stripe.stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'eur',
                customer: user.customerId,
                payment_method_types: ['card']
              });

            case 8:
              paymentIntent = _context.sent;
              return _context.abrupt("return", paymentIntent.client_secret);

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
exports.paymentIntent = paymentIntent;