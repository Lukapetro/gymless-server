"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOnlineWorkout = void 0;

var _schema = require("@nexus/schema");

var _costants = require("../../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createOnlineWorkout = (0, _schema.mutationField)('CreateOnlineWorkout', {
  type: 'Workout',
  args: {
    title: (0, _schema.stringArg)({
      required: true
    }),
    description: (0, _schema.stringArg)(),
    duration: (0, _schema.intArg)({
      required: true
    }),
    spots: (0, _schema.intArg)({
      required: true
    }),
    isFree: (0, _schema.booleanArg)(),
    date: _costants.DateTime,
    link: (0, _schema.stringArg)({
      required: true
    }),
    zoomId: (0, _schema.stringArg)({
      required: true
    }),
    passcode: (0, _schema.stringArg)({
      required: true
    })
  },
  resolve: function () {
    var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, ctx) {
      var title, description, duration, spots, isFree, date, link, zoomId, passcode, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = _ref.title, description = _ref.description, duration = _ref.duration, spots = _ref.spots, isFree = _ref.isFree, date = _ref.date, link = _ref.link, zoomId = _ref.zoomId, passcode = _ref.passcode;
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
                  isFree: isFree,
                  spots: spots,
                  date: date,
                  typology: 'online',
                  trainer: {
                    connect: {
                      id: ctx.userId
                    }
                  },
                  onlineWorkout: {
                    create: {
                      link: link,
                      zoomId: zoomId,
                      passcode: passcode
                    }
                  },
                  cordinates: {
                    connect: {
                      id: 0
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
exports.createOnlineWorkout = createOnlineWorkout;