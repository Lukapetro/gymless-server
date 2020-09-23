"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersOnWorkouts = void 0;

var _nexus = require("nexus");

var UsersOnWorkouts = _nexus.schema.objectType({
  name: 'UsersOnWorkouts',
  definition: function definition(t) {
    t.model.user();
    t.model.workout();
    t.model.userId();
    t.model.workoutId();
    t.model.attended();
    t.model.createdAt();
  }
});

exports.UsersOnWorkouts = UsersOnWorkouts;