"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = void 0;

var _Signup = require("./Signup");

var _Login = require("./Login");

var _TrainerLogin = require("./TrainerLogin");

var _FacebookLogin = require("./FacebookLogin");

var _Cordinates = require("./Cordinates");

var _Workout = require("./Workout");

var _BookClass = require("./BookClass");

var _DeleteBooking = require("./DeleteBooking");

var _PaymentIntet = require("./PaymentIntet");

var _User = require("./User");

var _SocialLinking = require("./SocialLinking");

var _SetupIntent = require("./SetupIntent");

var _DetachPaymentMethod = require("./payments/DetachPaymentMethod");

var _ConfirmUser = require("./ConfirmUser");

var _ForgotPassword = require("./ForgotPassword");

var _ChangePassword = require("./user/ChangePassword");

var _sendHelpRequest = require("./help/sendHelpRequest");

var _RecordAttendance = require("./RecordAttendance");

var _CreateOnlineWorkout = require("./workout/CreateOnlineWorkout");

var Mutation = {
  signup: _Signup.signup,
  login: _Login.login,
  user: _User.user,
  trainerLogin: _TrainerLogin.trainerLogin,
  facebookLogin: _FacebookLogin.facebookLogin,
  cordinates: _Cordinates.cordinates,
  workout: _Workout.workout,
  bookClass: _BookClass.bookClass,
  deleteBooking: _DeleteBooking.deleteBooking,
  paymentIntent: _PaymentIntet.paymentIntent,
  socialLinking: _SocialLinking.socialLinking,
  setupIntent: _SetupIntent.setupIntent,
  detachPaymentMethod: _DetachPaymentMethod.detachPaymentMethod,
  forgotPassword: _ForgotPassword.forgotPassword,
  confirmUser: _ConfirmUser.confirmUser,
  changePassword: _ChangePassword.changePassword,
  sendHelpRequest: _sendHelpRequest.sendHelpRequest,
  recordAttendance: _RecordAttendance.recordAttendance,
  createOnlineWorkout: _CreateOnlineWorkout.createOnlineWorkout
};
exports.Mutation = Mutation;