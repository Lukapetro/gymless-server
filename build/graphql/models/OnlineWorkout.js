"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineWorkout = void 0;

var _nexus = require("nexus");

var OnlineWorkout = _nexus.schema.objectType({
  name: 'OnlineWorkout',
  definition: function definition(t) {
    t.model.id();
    t.model.workout();
    t.model.link();
    t.model.passcode();
    t.model.zoomId();
    t.model.workoutId();
  }
});

exports.OnlineWorkout = OnlineWorkout;