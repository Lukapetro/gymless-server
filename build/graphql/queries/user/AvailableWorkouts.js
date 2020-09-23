"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableWorkouts = void 0;

var _schema = require("@nexus/schema");

var _costants = require("../../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var availableWorkouts = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.list.field('userAvailableWorkouts', {
      type: 'Workout',
      args: {
        startDate: _costants.DateTime,
        endDate: _costants.DateTime
      },
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
          var startDate, endDate;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  startDate = _ref.startDate, endDate = _ref.endDate;
                  return _context.abrupt("return", ctx.prisma.workout.findMany({
                    where: {
                      date: {
                        gt: startDate,
                        lt: endDate
                      },
                      AND: {
                        partecipants: {
                          none: {
                            userId: ctx.userId
                          }
                        }
                      }
                    },
                    orderBy: {
                      date: 'asc'
                    }
                  }));

                case 2:
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
exports.availableWorkouts = availableWorkouts;