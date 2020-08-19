import { signup } from './Signup'
import { login } from './Login'
import { trainerLogin } from './TrainerLogin'
import { facebookLogin } from './FacebookLogin'
import { cordinates } from './Cordinates'
import { workout } from './Workout'
import { bookWorkout } from './BookWorkout'
import { deleteBooking } from './DeleteBooking'
import { paymentIntent } from './PaymentIntet'
import { user } from './User'
import { socialLinking } from './SocialLinking'

export const Mutation = {
  signup,
  login,
  user,
  trainerLogin,
  facebookLogin,
  cordinates,
  workout,
  bookWorkout,
  deleteBooking,
  paymentIntent,
  socialLinking,
}
