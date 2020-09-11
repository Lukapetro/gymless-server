import { signup } from './Signup'
import { login } from './Login'
import { trainerLogin } from './TrainerLogin'
import { facebookLogin } from './FacebookLogin'
import { cordinates } from './Cordinates'
import { workout } from './Workout'
import { bookClass } from './BookClass'
import { deleteBooking } from './DeleteBooking'
import { paymentIntent } from './PaymentIntet'
import { user } from './User'
import { socialLinking } from './SocialLinking'
import { setupIntent } from './SetupIntent'
import { detachPaymentMethod } from './payments/DetachPaymentMethod'
import { confirmUser } from './ConfirmUser'

export const Mutation = {
  signup,
  login,
  user,
  trainerLogin,
  facebookLogin,
  cordinates,
  workout,
  bookClass,
  deleteBooking,
  paymentIntent,
  socialLinking,
  setupIntent,
  detachPaymentMethod,
  confirmUser,
}
