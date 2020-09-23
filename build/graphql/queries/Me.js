"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.me = void 0;

var _schema = require("@nexus/schema");

var me = (0, _schema.queryField)('me', {
  type: 'User',
  resolve: function resolve(parent, args, ctx) {
    return ctx.prisma.user.findOne({
      where: {
        id: ctx.userId
      }
    });
  }
});
exports.me = me;