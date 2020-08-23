import { mutationField } from '@nexus/schema'
import { stripe } from '../../stripe'

export const setupIntent = mutationField('setupIntent', {
  type: 'String',
  resolve: async (parent, { id }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: user.customerId,
    })

    return setupIntent.client_secret
  },
})
