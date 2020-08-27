import { mutationField, intArg, stringArg } from '@nexus/schema'
import { stripe } from '../../stripe'

export const paymentIntent = mutationField('paymentIntent', {
  type: 'Workout',
  args: {
    id: intArg({ required: true }),
    amount: intArg({ required: true }),
    paymentMethod: stringArg({ required: true }),
  },
  resolve: async (parent, { id, amount, paymentMethod }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      customer: user.customerId,
      payment_method: paymentMethod,
      confirm: true,
    })

    if (paymentIntent.status === 'succeeded') {
      return ctx.prisma.workout.update({
        data: {
          partecipants: {
            connect: [
              {
                id: ctx.userId,
              },
            ],
          },
        },
        where: {
          id: Number(id),
        },
      })
    }

    return paymentIntent.client_secret
  },
})
