"use strict";

var passport = require('passport');

var FacebookTokenStrategy = require('passport-facebook-token'); // FACEBOOK STRATEGY


var FacebookTokenStrategyCallback = function FacebookTokenStrategyCallback(accessToken, refreshToken, profile, done) {
  return done(null, {
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  });
};

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  profileFields: ['id', 'displayName', 'email', 'birthday', 'first_name', 'last_name']
}, FacebookTokenStrategyCallback)); // promisified authenticate functions

var authenticateFacebook = function authenticateFacebook(req, res) {
  return new Promise(function (resolve, reject) {
    passport.authenticate('facebook-token', {
      session: false
    }, function (err, data, info) {
      if (err) reject(err);
      resolve({
        data: data,
        info: info
      });
    })(req, res);
  });
};

module.exports = {
  authenticateFacebook: authenticateFacebook
};