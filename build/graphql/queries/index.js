"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _Me = require("./Me");

var _Workout = require("./Workout");

var _Referral = require("./Referral");

var _Cordinates = require("./Cordinates");

var _Workout2 = require("./trainer/Workout");

var _BookedWorkouts = require("./user/BookedWorkouts");

var _AvailableWorkouts = require("./user/AvailableWorkouts");

var _PaymentMethods = require("./payments/PaymentMethods");

var _DemolishedGymless = require("./user/DemolishedGymless");

var Query = {
  me: _Me.me,
  workout: _Workout.workout,
  cordinates: _Cordinates.cordinates,
  trainerWorkout: _Workout2.trainerWorkout,
  bookedWorkouts: _BookedWorkouts.bookedWorkouts,
  availableWorkouts: _AvailableWorkouts.availableWorkouts,
  paymentMethods: _PaymentMethods.paymentMethods,
  referral: _Referral.referral,
  demolishedGymless: _DemolishedGymless.demolishedGymless
};
exports.Query = Query;