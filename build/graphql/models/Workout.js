"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Workout = void 0;

var _nexus = require("nexus");

var Workout = _nexus.schema.objectType({
  name: 'Workout',
  definition: function definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.spots();
    t.model.duration();
    t.model.date();
    t.model.trainer();
    t.model.partecipants();
    t.model.cordinates();
  }
});

exports.Workout = Workout;