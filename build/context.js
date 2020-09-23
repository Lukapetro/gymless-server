"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = exports.prisma = void 0;

var _client = require("@prisma/client");

var _jsonwebtoken = require("jsonwebtoken");

var _costants = require("./utils/costants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prisma = new _client.PrismaClient();
exports.prisma = prisma;

var createContext = function createContext(ctx) {
  var userId;

  try {
    var Authorization = '';

    try {
      // for queries and mutations
      Authorization = ctx.req.get('Authorization');
    } catch (e) {
      var _ctx$connection, _ctx$connection$conte;

      // specifically for subscriptions as the above will fail
      Authorization = ctx === null || ctx === void 0 ? void 0 : (_ctx$connection = ctx.connection) === null || _ctx$connection === void 0 ? void 0 : (_ctx$connection$conte = _ctx$connection.context) === null || _ctx$connection$conte === void 0 ? void 0 : _ctx$connection$conte.Authorization;
    }

    var token = Authorization.replace('Bearer ', '');
    var verifiedToken = (0, _jsonwebtoken.verify)(token, process.env.APP_SECRET);
    if (!verifiedToken.userId && verifiedToken.type !== _costants.tokens.access.name) userId = -1;else userId = verifiedToken.userId;
  } catch (e) {
    userId = -1;
  }

  return _objectSpread(_objectSpread({}, ctx), {}, {
    prisma: prisma,
    userId: userId
  });
};

exports.createContext = createContext;