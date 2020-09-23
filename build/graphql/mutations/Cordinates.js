"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cordinates = void 0;

var _schema = require("@nexus/schema");

var cordinates = (0, _schema.extendType)({
  type: 'Mutation',
  definition: function definition(t) {
    t.crud.createOneCordinates();
    t.crud.updateOneCordinates();
    t.crud.deleteOneCordinates();
  }
});
exports.cordinates = cordinates;