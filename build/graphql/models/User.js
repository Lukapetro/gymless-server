"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _nexus = require("nexus");

var User = _nexus.schema.objectType({
  name: 'User',
  definition: function definition(t) {
    t.model.id();
    t.model.name();
    t.model.surname();
    t.model.email();
    t.model.stripeId();
    t.model.customerId();
    t.model.confirmed();
    t.model.referrer();
    t.model.referral();
    t.model.bio();
    t.model.lastLoggedIn();
    t.model.facebookId();
    t.model.workouts();
    t.model.role();
    t.model.sex();
    t.model.birthDate();
    t.model.avatarId();
    t.model.classes();
    t.model.gymlerType();
  }
});

exports.User = User;