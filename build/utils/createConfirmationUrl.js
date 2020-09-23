"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConfirmationUrl = void 0;

var _context2 = require("../context");

var _costants = require("./costants");

var _generateToken = require("./generateToken");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createConfirmationUrl = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = (0, _generateToken.generateToken)(userId, _costants.tokenTypeConfirmation);
            _context.next = 3;
            return _context2.prisma.token.create({
              data: {
                token: token
              }
            });

          case 3:
            return _context.abrupt("return", "".concat(process.env.AMBIENTE, "/user/confirm/").concat(token));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createConfirmationUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createConfirmationUrl = createConfirmationUrl;