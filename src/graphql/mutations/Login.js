import { schema } from 'nexus'
import { sign } from 'jsonwebtoken'
import { mutationField } from '@nexus/schema'

export const login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    email: schema.stringArg({ nullable: false }),
    password: schema.stringArg({ nullable: false }),
  },
  resolve: async (_parent, { email, password }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
})
