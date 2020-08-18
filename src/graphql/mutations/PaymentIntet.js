import { mutationField } from '@nexus/schema'
import { stripe } from '../../stripe'

export const paymentIntent = mutationField('paymentIntent', {
  type: 'String',
  resolve: async (parent, { id }, ctx) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'eur',
    })

    return paymentIntent.client_secret
  },
})
