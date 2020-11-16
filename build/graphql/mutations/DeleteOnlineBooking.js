"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteOnlineBooking = void 0;

var _schema = require("@nexus/schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteOnlineBooking = (0, _schema.mutationField)('deleteOnlineBooking', {
  type: 'Workout',
  args: {
    id: (0, _schema.idArg)(),
    isFree: (0, _schema.booleanArg)({
      required: false
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref, ctx) {
      var id, isFree, SIX_HOUR, sixHourFromNow, updateWorkout, _updateWorkout, user, workout;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _updateWorkout = function _updateWorkout3() {
                _updateWorkout = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return ctx.prisma.usersOnWorkouts["delete"]({
                            where: {
                              workoutId_userId: {
                                userId: ctx.userId,
                                workoutId: Number(id)
                              }
                            }
                          });

                        case 2:
                          return _context.abrupt("return", ctx.prisma.workout.update({
                            data: {
                              spots: workout.spots + 1
                            },
                            where: {
                              id: Number(id)
                            }
                          }));

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return _updateWorkout.apply(this, arguments);
              };

              updateWorkout = function _updateWorkout2() {
                return _updateWorkout.apply(this, arguments);
              };

              id = _ref.id, isFree = _ref.isFree;
              SIX_HOUR = 60 * 60 * 1000 * 6;
              /* ms */

              sixHourFromNow = Date.now() + SIX_HOUR;
              _context2.next = 7;
              return ctx.prisma.user.findOne({
                where: {
                  id: ctx.userId
                }
              });

            case 7:
              user = _context2.sent;

              if (user) {
                _context2.next = 10;
                break;
              }

              throw new Error("Non autorizzato");

            case 10:
              _context2.next = 12;
              return ctx.prisma.workout.findOne({
                where: {
                  id: Number(id)
                }
              });

            case 12:
              workout = _context2.sent;

              if (workout) {
                _context2.next = 15;
                break;
              }

              throw new Error("Errore: classe non trovata");

            case 15:
              if (!isFree) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", updateWorkout());

            case 17:
              if (!(workout.date < Date.now())) {
                _context2.next = 19;
                break;
              }

              throw new Error("Operazione non consentita");

            case 19:
              if (!(workout.date < sixHourFromNow)) {
                _context2.next = 23;
                break;
              }

              return _context2.abrupt("return", updateWorkout());

            case 23:
              _context2.next = 25;
              return ctx.prisma.user.update({
                data: {
                  onlineClasses: user.onlineClasses + 1
                },
                where: {
                  id: ctx.userId
                }
              });

            case 25:
              return _context2.abrupt("return", updateWorkout());

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function resolve(_x, _x2, _x3) {
      return _resolve.apply(this, arguments);
    }

    return resolve;
  }()
});
exports.deleteOnlineBooking = deleteOnlineBooking;