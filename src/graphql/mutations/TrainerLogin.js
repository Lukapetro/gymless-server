import { mutationField } from '@nexus/schema'
import { schema } from 'nexus'
import { compare } from 'bcryptjs'

export const trainerLogin = mutationField('trainerLogin', {
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

    if (user.role !== 'trainer') {
      throw new Error(`Utente non abilitato`)
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
