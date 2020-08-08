import { schema } from 'nexus'

export const Workout = schema.objectType({
  name: 'Workout',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.spots()
    t.model.location()
    t.model.trainer()
    t.model.partecipants()
  },
})
