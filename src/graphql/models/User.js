import { schema } from 'nexus'

export const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.stripeId()
    t.model.bio()
    t.model.facebookId()
    t.model.workouts()
    t.model.role()
    t.model.sex()
    t.model.birthDate()
    t.model.avatarId()
  },
})
