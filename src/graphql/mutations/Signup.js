import { schema } from 'nexus'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { mutationField } from '@nexus/schema'
import { stripe } from '../../stripe'

export const signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    name: schema.stringArg(),
    email: schema.stringArg({ nullable: false }),
    password: schema.stringArg({ nullable: false }),
    referrerId: schema.intArg(),
  },
  resolve: async (_parent, { name, email, password, referrerId }, ctx) => {
    const hashedPassword = await hash(password, 10)

    const customer = await stripe.customers.create({
      name,
      email,
    })

    const user = await ctx.prisma.user.create({
      data: {
        name,
        email,
        customerId: customer.id,
        password: hashedPassword,
      },
    })

    if (referrerId) {
      await ctx.prisma.referral.create({
        data: {
          referrer: {
            connect: { id: referrerId },
          },
          referred: {
            connect: { id: user.id },
          },
        },
      })
    }

    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
})
