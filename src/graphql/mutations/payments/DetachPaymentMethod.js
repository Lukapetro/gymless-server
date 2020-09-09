import { mutationField, stringArg } from '@nexus/schema'

import { stripe } from '../../../stripe'
import { JSONScalar } from '../../../utils/costants'

export const detachPaymentMethod = mutationField('detachPaymentMethod', {
  type: JSONScalar,
  args: {
    id: stringArg({ required: true }),
  },
  resolve: async (parent, { id }, ctx) => {
    if (!ctx.userId) {
      throw new Error('Non autorizzato')
    }
    const paymentMethod = await stripe.paymentMethods.detach(id)

    if (!paymentMethod) throw new Error('Operazione fallita')

    return paymentMethod
  },
})
