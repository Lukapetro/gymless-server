"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;

var _jsonwebtoken = require("jsonwebtoken");

function generateToken(userId, tokenType) {
  var token = (0, _jsonwebtoken.sign)({
    userId: userId,
    timestamp: Date.now(),
    tokenType: tokenType
  }, process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
}