import { extendType } from '@nexus/schema'

export const referral = extendType({
  type: 'Query',
  definition(t) {
    t.crud.referral()
    t.crud.referrals()
  },
})
