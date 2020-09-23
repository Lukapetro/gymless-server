"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripe = void 0;

var _stripe = _interopRequireDefault(require("stripe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var stripe = new _stripe["default"](process.env.STRIPE_SECRET);
exports.stripe = stripe;