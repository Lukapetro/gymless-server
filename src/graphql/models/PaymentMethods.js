import { schema } from 'nexus'
import { objectType } from '@nexus/schema'

const Card = objectType({
  name: 'Card',
  definition(t) {
    t.string('brand')
  },
})

export const PaymentMethods = schema.objectType({
  name: 'PaymentMethods',
  definition(t) {
    t.list.field('data', {
      type: Card,
      resolve(root, args, ctx) {
        return root
      },
    })
  },
})
