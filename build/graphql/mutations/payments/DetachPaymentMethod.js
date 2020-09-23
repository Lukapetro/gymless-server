"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detachPaymentMethod = void 0;

var _schema = require("@nexus/schema");

var _stripe = require("../../../stripe");

var _costants = require("../../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var detachPaymentMethod = (0, _schema.mutationField)('detachPaymentMethod', {
  type: _costants.JSONScalar,
  args: {
    id: (0, _schema.stringArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var id, paymentMethod;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;

              if (ctx.userId) {
                _context.next = 3;
                break;
              }

              throw new Error('Non autorizzato');

            case 3:
              _context.next = 5;
              return _stripe.stripe.paymentMethods.detach(id);

            case 5:
              paymentMethod = _context.sent;

              if (paymentMethod) {
                _context.next = 8;
                break;
              }

              throw new Error('Operazione fallita');

            case 8:
              return _context.abrupt("return", paymentMethod);

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
exports.detachPaymentMethod = detachPaymentMethod;