"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordAttendance = void 0;

var _schema = require("@nexus/schema");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var recordAttendance = (0, _schema.mutationField)('recordAttendance', {
  type: 'Boolean',
  args: {
    userId: (0, _schema.intArg)({
      required: true
    }),
    workoutId: (0, _schema.intArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2) {
      var userId, workoutId, prisma;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = _ref.userId, workoutId = _ref.workoutId;
              prisma = _ref2.prisma;
              _context.next = 4;
              return prisma.usersOnWorkouts.update({
                data: {
                  attended: true
                },
                where: {
                  workoutId_userId: {
                    userId: userId,
                    workoutId: workoutId
                  }
                }
              });

            case 4:
              return _context.abrupt("return", true);

            case 5:
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
exports.recordAttendance = recordAttendance;