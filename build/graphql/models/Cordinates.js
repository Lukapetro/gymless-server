"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cordinates = void 0;

var _nexus = require("nexus");

var Cordinates = _nexus.schema.objectType({
  name: 'Cordinates',
  definition: function definition(t) {
    t.model.id();
    t.model.city();
    t.model.address();
    t.model.latitude();
    t.model.longitude();
    t.model.workout();
  }
});

exports.Cordinates = Cordinates;