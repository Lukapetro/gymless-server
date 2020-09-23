"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.referral = void 0;

var _schema = require("@nexus/schema");

var referral = (0, _schema.extendType)({
  type: 'Query',
  definition: function definition(t) {
    t.crud.referral({
      filtering: true
    });
    t.crud.referrals();
  }
});
exports.referral = referral;