"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trainerWorkout = void 0;

var _schema = require("@nexus/schema");

var _utils = require("../../../utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var trainerWorkout = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.list.field('futureWorkouts', {
      type: 'Workout',
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, ctx) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", ctx.prisma.workout.findMany({
                    where: {
                      date: {
                        gt: (0, _utils.getToday)()
                      },
                      AND: {
                        trainerId: ctx.userId
                      }
                    }
                  }));

                case 1:
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
    t.list.field('pastWorkouts', {
      type: 'Workout',
      resolve: function () {
        var _resolve2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, ctx) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", ctx.prisma.workout.findMany({
                    where: {
                      date: {
                        lte: (0, _utils.getToday)()
                      },
                      AND: {
                        trainerId: ctx.userId
                      }
                    }
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function resolve(_x4, _x5, _x6) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    });
  }
});
exports.trainerWorkout = trainerWorkout;