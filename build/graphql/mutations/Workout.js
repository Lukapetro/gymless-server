"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workout = void 0;

var _schema = require("@nexus/schema");

var _nexus = require("nexus");

var _costants = require("../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var workout = (0, _schema.extendType)({
  type: 'Mutation',
  definition: function definition(t) {
    t.field('createWorkout', {
      type: 'Workout',
      args: {
        title: _nexus.schema.stringArg({
          required: true
        }),
        description: _nexus.schema.stringArg(),
        duration: _nexus.schema.intArg({
          required: true
        }),
        spots: _nexus.schema.intArg({
          required: true
        }),
        cordinatesId: _nexus.schema.intArg(),
        date: _costants.DateTime
      },
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_, _ref, ctx) {
          var title, description, spots, date, cordinatesId, duration, user;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  title = _ref.title, description = _ref.description, spots = _ref.spots, date = _ref.date, cordinatesId = _ref.cordinatesId, duration = _ref.duration;
                  _context.next = 3;
                  return ctx.prisma.user.findOne({
                    where: {
                      id: ctx.userId
                    }
                  });

                case 3:
                  user = _context.sent;

                  if (!(user.role !== 'trainer')) {
                    _context.next = 6;
                    break;
                  }

                  throw new Error('Utente non abilitato');

                case 6:
                  return _context.abrupt("return", ctx.prisma.workout.create({
                    data: {
                      title: title,
                      description: description,
                      duration: duration,
                      spots: spots,
                      date: date,
                      trainer: {
                        connect: {
                          id: ctx.userId
                        }
                      },
                      cordinates: {
                        connect: {
                          id: cordinatesId
                        }
                      }
                    }
                  }));

                case 7:
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
    t.crud.updateOneWorkout();
    t.crud.deleteOneWorkout();
  }
});
exports.workout = workout;