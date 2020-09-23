"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cordinates = void 0;

var _schema = require("@nexus/schema");

var cordinates = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.crud.cordinates();
  }
});
exports.cordinates = cordinates;