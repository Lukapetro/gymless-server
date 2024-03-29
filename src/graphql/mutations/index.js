import { signup } from './Signup'
import { login } from './Login'
import { trainerLogin } from './TrainerLogin'
import { facebookLogin } from './FacebookLogin'
import { cordinates } from './Cordinates'
import { workout } from './Workout'
import { bookClass } from './BookClass'
import { bookOnlineClass } from './BookOnlineClass'
import { deleteBooking } from './DeleteBooking'
import { deleteOnlineBooking } from './DeleteOnlineBooking'

import { paymentIntent } from './PaymentIntet'
import { user } from './User'
import { socialLinking } from './SocialLinking'
import { setupIntent } from './SetupIntent'
import { detachPaymentMethod } from './payments/DetachPaymentMethod'
import { confirmUser } from './ConfirmUser'
import { forgotPassword } from './ForgotPassword'
import { changePassword } from './user/ChangePassword'
import { sendHelpRequest } from './help/sendHelpRequest'
import { recordAttendance } from './RecordAttendance'
import { createOnlineWorkout } from './workout/CreateOnlineWorkout'
import { updateOnlineWorkout } from './workout/UpdateOnlineWorkout'
import { updateOutdoorWorkout } from './workout/UpdateOutdoorWorkout'

export const Mutation = {
  signup,
  login,
  user,
  trainerLogin,
  facebookLogin,
  cordinates,
  workout,
  bookClass,
  bookOnlineClass,
  deleteBooking,
  deleteOnlineBooking,
  paymentIntent,
  socialLinking,
  setupIntent,
  detachPaymentMethod,
  forgotPassword,
  confirmUser,
  changePassword,
  sendHelpRequest,
  recordAttendance,
  createOnlineWorkout,
  updateOnlineWorkout,
  updateOutdoorWorkout,
}
