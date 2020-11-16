"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookOnlineClass = void 0;

var _schema = require("@nexus/schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bookOnlineClass = (0, _schema.mutationField)('bookOnlineClass', {
  type: 'Workout',
  args: {
    id: (0, _schema.intArg)({
      required: true
    }),
    isFree: (0, _schema.booleanArg)({
      required: false
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var id, isFree, user, workout, referral, _yield$ctx$prisma$use, onlineClasses;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id, isFree = _ref.isFree;
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
              return ctx.prisma.workout.findOne({
                where: {
                  id: Number(id)
                }
              });

            case 8:
              workout = _context.sent;

              if (!(workout.spots <= 0)) {
                _context.next = 11;
                break;
              }

              throw new Error('La classe è al completo');

            case 11:
              if (!isFree) {
                _context.next = 15;
                break;
              }

              _context.next = 14;
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

            case 14:
              return _context.abrupt("return", ctx.prisma.workout.update({
                data: {
                  spots: workout.spots - 1
                },
                where: {
                  id: Number(id)
                }
              }));

            case 15:
              if (!(user.onlineClasses <= 0)) {
                _context.next = 17;
                break;
              }

              throw new Error('Classi non sufficienti');

            case 17:
              _context.next = 19;
              return ctx.prisma.user.update({
                data: {
                  onlineClasses: user.onlineClasses - 1
                },
                where: {
                  id: ctx.userId
                }
              });

            case 19:
              _context.next = 21;
              return ctx.prisma.referral.findOne({
                where: {
                  referredId: user.id
                }
              });

            case 21:
              referral = _context.sent;

              if (!(referral && !referral.completed)) {
                _context.next = 34;
                break;
              }

              _context.next = 25;
              return ctx.prisma.user.findOne({
                where: {
                  id: referral.referrerId
                }
              });

            case 25:
              _yield$ctx$prisma$use = _context.sent;
              onlineClasses = _yield$ctx$prisma$use.onlineClasses;
              _context.t0 = ctx.prisma.referral;
              _context.t1 = {
                data: {
                  completed: true
                },
                where: {
                  referredId: user.id
                }
              };
              _context.next = 31;
              return ctx.prisma.user.update({
                data: {
                  onlineClasses: onlineClasses + 1
                },
                where: {
                  id: referral.referrerId
                }
              });

            case 31:
              _context.t2 = _context.sent;
              _context.next = 34;
              return _context.t0.update.call(_context.t0, _context.t1, _context.t2);

            case 34:
              _context.next = 36;
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

            case 36:
              return _context.abrupt("return", ctx.prisma.workout.update({
                data: {
                  spots: workout.spots - 1
                },
                where: {
                  id: Number(id)
                }
              }));

            case 37:
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
exports.bookOnlineClass = bookOnlineClass;