import { signup } from './Signup'
import { login } from './Login'
import { trainerLogin } from './TrainerLogin'
import { facebookLogin } from './FacebookLogin'
import { cordinates } from './Cordinates'
import { workout } from './Workout'
import { bookWorkout } from './BookWorkout'
import { deleteBooking } from './DeleteBooking'
import { paymentIntent } from './PaymentIntet'

export const Mutation = {
  signup,
  login,
  trainerLogin,
  facebookLogin,
  cordinates,
  workout,
  bookWorkout,
  deleteBooking,
  paymentIntent,
}
