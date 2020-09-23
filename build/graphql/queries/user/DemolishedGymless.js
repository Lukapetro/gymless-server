"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demolishedGymless = void 0;

var _schema = require("@nexus/schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var demolishedGymless = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.field('demolishedGymless', {
      type: 'Int',
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, ctx) {
          var user;
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

                  throw new Error('Utente non trovato');

                case 5:
                  return _context.abrupt("return", ctx.prisma.usersOnWorkouts.count({
                    where: {
                      userId: ctx.userId,
                      AND: {
                        attended: true
                      }
                    }
                  }));

                case 6:
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
exports.demolishedGymless = demolishedGymless;