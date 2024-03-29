import { extendType } from '@nexus/schema'

import { stripe } from '../../../stripe'
import { JSONScalar } from '../../../utils/costants'

export const paymentMethods = extendType({
  type: 'Query',
  definition(t) {
    t.field('paymentMethods', {
      type: JSONScalar,
      resolve: async (_parent, args, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (!user) {
          throw new Error(`Non autorizzato`)
        }

        const paymentMethods = await stripe.paymentMethods.list({
          customer: user.customerId,
          type: 'card',
        })

        return paymentMethods
      },
    })
  },
})
