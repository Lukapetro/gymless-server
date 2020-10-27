import { schema } from 'nexus'

export const Workout = schema.objectType({
  name: 'Workout',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.description()
    t.model.spots()
    t.model.duration()
    t.model.date()
    t.model.isFree()
    t.model.trainer()
    t.model.partecipants()
    t.model.cordinates()
  },
})
