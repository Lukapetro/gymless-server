"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;

var _schema = require("@nexus/schema");

var _bcryptjs = require("bcryptjs");

var _costants = require("../../utils/costants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var user = (0, _schema.extendType)({
  type: 'Mutation',
  definition: function definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        name: (0, _schema.stringArg)(),
        surname: (0, _schema.stringArg)(),
        email: (0, _schema.stringArg)(),
        birthDate: _costants.GQLDate,
        sex: _costants.SexType
      },
      resolve: function resolve(parent, _ref, ctx) {
        var name = _ref.name,
            surname = _ref.surname,
            email = _ref.email,
            sex = _ref.sex,
            birthDate = _ref.birthDate;

        if (!ctx.userId) {
          throw new Error('Non auteticato');
        }

        if (email) return ctx.prisma.user.update({
          data: {
            email: email.toLowerCase()
          },
          where: {
            id: ctx.userId
          }
        });
        return ctx.prisma.user.update({
          data: {
            name: name,
            surname: surname,
            sex: sex,
            birthDate: birthDate
          },
          where: {
            id: ctx.userId
          }
        });
      }
    });
    t.field('updateUserPassword', {
      type: 'User',
      args: {
        oldPassword: (0, _schema.stringArg)(),
        newPassword: (0, _schema.stringArg)()
      },
      resolve: function () {
        var _resolve = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref2, ctx) {
          var oldPassword, newPassword, user, passwordValid, hashedPassword;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  oldPassword = _ref2.oldPassword, newPassword = _ref2.newPassword;
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
                  return (0, _bcryptjs.compare)(oldPassword, user.password);

                case 8:
                  passwordValid = _context.sent;

                  if (passwordValid) {
                    _context.next = 11;
                    break;
                  }

                  throw new Error('Password attuale non valida');

                case 11:
                  _context.next = 13;
                  return (0, _bcryptjs.hash)(newPassword, 10);

                case 13:
                  hashedPassword = _context.sent;
                  return _context.abrupt("return", ctx.prisma.user.update({
                    data: {
                      password: hashedPassword
                    },
                    where: {
                      id: ctx.userId
                    }
                  }));

                case 15:
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
    t.field('updateUserClasses', {
      type: 'User',
      args: {
        classes: (0, _schema.intArg)({
          required: true
        })
      },
      resolve: function () {
        var _resolve2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref3, ctx) {
          var classes, user;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  classes = _ref3.classes;
                  _context2.next = 3;
                  return ctx.prisma.user.findOne({
                    where: {
                      id: ctx.userId
                    }
                  });

                case 3:
                  user = _context2.sent;

                  if (user) {
                    _context2.next = 6;
                    break;
                  }

                  throw new Error("Non autorizzato");

                case 6:
                  if (!(classes < 0 && user.classes === 0)) {
                    _context2.next = 8;
                    break;
                  }

                  throw new Error('Classi non sufficienti');

                case 8:
                  return _context2.abrupt("return", ctx.prisma.user.update({
                    data: {
                      classes: user.classes + classes
                    },
                    where: {
                      id: ctx.userId
                    }
                  }));

                case 9:
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
    t.field('deleteUser', {
      type: 'User',
      resolve: function resolve(parent, args, ctx) {
        if (!ctx.userId) {
          throw new Error('Non auteticato');
        }

        return ctx.prisma.user["delete"]({
          where: {
            id: ctx.userId
          }
        });
      }
    });
    t.field('updateAvatar', {
      type: 'User',
      args: {
        avatarId: (0, _schema.stringArg)()
      },
      resolve: function () {
        var _resolve3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref4, ctx) {
          var avatarId;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  avatarId = _ref4.avatarId;

                  if (ctx.userId) {
                    _context3.next = 3;
                    break;
                  }

                  throw new Error('Not athenticated');

                case 3:
                  return _context3.abrupt("return", ctx.prisma.user.update({
                    data: {
                      avatarId: avatarId
                    },
                    where: {
                      id: ctx.userId
                    }
                  }));

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function resolve(_x7, _x8, _x9) {
          return _resolve3.apply(this, arguments);
        }

        return resolve;
      }()
    });
  }
});
exports.user = user;