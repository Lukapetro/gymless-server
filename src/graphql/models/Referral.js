import { schema } from 'nexus'

export const Referral = schema.objectType({
  name: 'Referral',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.completed()
    t.model.referrerId()
    t.model.referrer()
    t.model.referred()
    t.model.referredId()
  },
})
