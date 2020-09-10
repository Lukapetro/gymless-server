import { mutationField, intArg, stringArg } from '@nexus/schema'

import { stripe } from '../../stripe'
import { JSONScalar } from '../../utils/costants'

export const paymentIntent = mutationField('paymentIntent', {
  type: JSONScalar,
  args: {
    amount: intArg({ required: true }),
  },
  resolve: async (parent, { amount }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'eur',
      customer: user.customerId,
      payment_method_types: ['card'],
    })

    return paymentIntent.client_secret
  },
})
