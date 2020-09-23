"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _queries = require("./queries");

var _mutations = require("./mutations");

var _User = require("./models/User");

var _AuthPayload = require("./models/AuthPayload");

var _Cordinates = require("./models/Cordinates");

var _Workout = require("./models/Workout");

var _PaymentMethods = require("./models/PaymentMethods");

var _Referral = require("./models/Referral");

var _UsersOnWorkouts = require("./models/UsersOnWorkouts");

var resolvers = [_queries.Query, _mutations.Mutation, _User.User, _AuthPayload.AuthPayload, _Cordinates.Cordinates, _PaymentMethods.PaymentMethods, _Workout.Workout, _Referral.Referral, _UsersOnWorkouts.UsersOnWorkouts];
exports.resolvers = resolvers;