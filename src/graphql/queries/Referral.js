import { extendType } from '@nexus/schema'

export const referral = extendType({
  type: 'Query',
  definition(t) {
    t.crud.referral({ filtering: true })
    t.crud.referrals()
  },
})
