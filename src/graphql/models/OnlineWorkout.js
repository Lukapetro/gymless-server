import { schema } from 'nexus'

export const OnlineWorkout = schema.objectType({
  name: 'OnlineWorkout',
  definition(t) {
    t.model.id()
    t.model.workout()
    t.model.link()
    t.model.passcode()
    t.model.zoomId()
    t.model.workoutId()
  },
})
