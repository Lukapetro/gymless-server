import { me } from './Me'
import { workout } from './Workout'
import { cordinates } from './Cordinates'
import { trainerWorkout } from './trainer/Workout'
import { bookedWorkouts } from './user/BookedWorkouts'
import { availableWorkouts } from './user/AvailableWorkouts'

export const Query = {
  me,
  workout,
  cordinates,
  trainerWorkout,
  bookedWorkouts,
  availableWorkouts,
}
