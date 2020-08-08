import { schema } from 'nexus'

export const Trainer = schema.objectType({
  name: 'Trainer',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.workouts()
  },
})
