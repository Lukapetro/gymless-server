"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookClass = void 0;

var _schema = require("@nexus/schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bookClass = (0, _schema.mutationField)('bookClass', {
  type: 'Workout',
  args: {
    id: (0, _schema.intArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var id, user, workout, referral, _yield$ctx$prisma$use, classes;

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
              if (!(user.classes <= 0)) {
                _context.next = 8;
                break;
              }

              throw new Error('Classi non sufficienti');

            case 8:
              _context.next = 10;
              return ctx.prisma.workout.findOne({
                where: {
                  id: Number(id)
                }
              });

            case 10:
              workout = _context.sent;

              if (!(workout.spots <= 0)) {
                _context.next = 13;
                break;
              }

              throw new Error('La classe è al completo');

            case 13:
              _context.next = 15;
              return ctx.prisma.user.update({
                data: {
                  classes: user.classes - 1
                },
                where: {
                  id: ctx.userId
                }
              });

            case 15:
              _context.next = 17;
              return ctx.prisma.referral.findOne({
                where: {
                  referredId: user.id
                }
              });

            case 17:
              referral = _context.sent;

              if (!(referral && !referral.completed)) {
                _context.next = 30;
                break;
              }

              _context.next = 21;
              return ctx.prisma.user.findOne({
                where: {
                  id: referral.referrerId
                }
              });

            case 21:
              _yield$ctx$prisma$use = _context.sent;
              classes = _yield$ctx$prisma$use.classes;
              _context.t0 = ctx.prisma.referral;
              _context.t1 = {
                data: {
                  completed: true
                },
                where: {
                  referredId: user.id
                }
              };
              _context.next = 27;
              return ctx.prisma.user.update({
                data: {
                  classes: classes + 1
                },
                where: {
                  id: referral.referrerId
                }
              });

            case 27:
              _context.t2 = _context.sent;
              _context.next = 30;
              return _context.t0.update.call(_context.t0, _context.t1, _context.t2);

            case 30:
              _context.next = 32;
              return ctx.prisma.usersOnWorkouts.create({
                data: {
                  user: {
                    connect: {
                      id: ctx.userId
                    }
                  },
                  workout: {
                    connect: {
                      id: Number(id)
                    }
                  }
                }
              });

            case 32:
              return _context.abrupt("return", ctx.prisma.workout.update({
                data: {
                  spots: workout.spots - 1
                },
                where: {
                  id: Number(id)
                }
              }));

            case 33:
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
exports.bookClass = bookClass;