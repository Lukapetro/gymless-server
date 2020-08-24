import { extendType } from '@nexus/schema'
import { stripe } from '../../../stripe'

import { GraphQLScalarType } from 'graphql'

export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  serialize: (data) => data,
  parseValue: (data) => data,
})

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

        console.log('paymentMethods: ', paymentMethods)

        return paymentMethods
      },
    })
  },
})
