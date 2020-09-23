import { schema } from 'nexus'

export const UsersOnWorkouts = schema.objectType({
  name: 'UsersOnWorkouts',
  definition(t) {
    t.model.user()
    t.model.workout()
    t.model.userId()
    t.model.workoutId()
    t.model.attended()
    t.model.createdAt()
  },
})
