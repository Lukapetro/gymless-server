"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookedWorkouts = void 0;

var _schema = require("@nexus/schema");

var bookedWorkouts = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.list.field('workoutsBooked', {
      type: 'Workout',
      resolve: function resolve(parent, args, ctx) {
        return ctx.prisma.workout.findMany({
          where: {
            partecipants: {
              some: {
                userId: ctx.userId
              }
            },
            AND: {
              date: {
                gt: new Date()
              }
            }
          }
        });
      }
    });
  }
});
exports.bookedWorkouts = bookedWorkouts;