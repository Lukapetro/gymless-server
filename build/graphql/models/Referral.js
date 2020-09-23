"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Referral = void 0;

var _nexus = require("nexus");

var Referral = _nexus.schema.objectType({
  name: 'Referral',
  definition: function definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.completed();
    t.model.referrerId();
    t.model.referrer();
    t.model.referred();
    t.model.referredId();
  }
});

exports.Referral = Referral;