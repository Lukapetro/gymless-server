import { schema } from 'nexus'

export const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.stripeId()
    t.model.customerId()
    t.model.confirmed()

    t.model.referrer()
    t.model.referral()

    t.model.bio()
    t.model.facebookId()
    t.model.workouts()
    t.model.role()
    t.model.sex()
    t.model.birthDate()
    t.model.avatarId()
    t.model.classes()
    t.model.gymlerType()
  },
})
