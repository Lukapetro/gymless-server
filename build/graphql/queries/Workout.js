"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workout = void 0;

var _schema = require("@nexus/schema");

var workout = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.crud.workout({
      filtering: true,
      ordering: true
    });
    t.crud.workouts({
      filtering: true,
      ordering: true
    });
  }
});
exports.workout = workout;