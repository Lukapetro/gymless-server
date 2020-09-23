"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentMethods = void 0;

var _nexus = require("nexus");

var _schema = require("@nexus/schema");

var Card = (0, _schema.objectType)({
  name: 'Card',
  definition: function definition(t) {
    t.string('brand');
  }
});

var PaymentMethods = _nexus.schema.objectType({
  name: 'PaymentMethods',
  definition: function definition(t) {
    t.list.field('data', {
      type: Card,
      resolve: function resolve(root, args, ctx) {
        return root;
      }
    });
  }
});

exports.PaymentMethods = PaymentMethods;