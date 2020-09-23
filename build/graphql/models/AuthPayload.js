"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthPayload = void 0;

var _nexus = require("nexus");

var AuthPayload = _nexus.schema.objectType({
  name: 'AuthPayload',
  definition: function definition(t) {
    t.string('token');
    t.field('user', {
      type: 'User'
    });
  }
});

exports.AuthPayload = AuthPayload;