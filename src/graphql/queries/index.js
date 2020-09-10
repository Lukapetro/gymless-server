import { me } from './Me'
import { workout } from './Workout'
import { referral } from './Referral'
import { cordinates } from './Cordinates'
import { trainerWorkout } from './trainer/Workout'
import { bookedWorkouts } from './user/BookedWorkouts'
import { availableWorkouts } from './user/AvailableWorkouts'
import { paymentMethods } from './payments/PaymentMethods'

export const Query = {
  me,
  workout,
  cordinates,
  trainerWorkout,
  bookedWorkouts,
  availableWorkouts,
  paymentMethods,
  referral,
}
