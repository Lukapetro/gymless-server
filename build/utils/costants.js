"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenTypeReset = exports.tokenTypeConfirmation = exports.JSONScalar = exports.WorkoutType = exports.SexType = exports.GQLDate = exports.DateTime = exports.isDev = void 0;

var _schema = require("@nexus/schema");

var _graphqlIsoDate = require("graphql-iso-date");

var _graphql = require("graphql");

var isDev = function isDev() {
  return process.env.NODE_ENV === 'development';
};

exports.isDev = isDev;
var DateTime = _graphqlIsoDate.GraphQLDateTime;
exports.DateTime = DateTime;
var GQLDate = (0, _schema.asNexusMethod)(_graphqlIsoDate.GraphQLDate, 'date', 'Date');
exports.GQLDate = GQLDate;
var SexType = (0, _schema.enumType)({
  name: 'Sex',
  description: 'The sex of the user',
  members: ['male', 'female', 'unknown']
});
exports.SexType = SexType;
var WorkoutType = (0, _schema.enumType)({
  name: 'Typology',
  description: 'The workout typology',
  members: ['online', 'outdoor']
});
exports.WorkoutType = WorkoutType;
var JSONScalar = new _graphql.GraphQLScalarType({
  name: 'JSON',
  serialize: function serialize(data) {
    return data;
  },
  parseValue: function parseValue(data) {
    return data;
  }
});
exports.JSONScalar = JSONScalar;
var tokenTypeConfirmation = 'confirmation';
exports.tokenTypeConfirmation = tokenTypeConfirmation;
var tokenTypeReset = 'reset';
exports.tokenTypeReset = tokenTypeReset;