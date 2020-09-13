import { mutationField, stringArg } from '@nexus/schema'
import { generateToken } from '../../utils/generateToken'
import { sendEmail } from '../../utils/sendEmail'
import { tokenTypeReset } from '../../utils/costants'

export const forgotPassword = mutationField('forgotPassword', {
  type: 'Boolean',
  args: {
    email: stringArg({ required: true }),
  },
  resolve: async (parent, { email }, ctx) => {
    //prendo l'utente con l'email
    const user = await ctx.prisma.user.findOne({ where: { email } })

    //se non esiste ritorno
    if (!user) return true

    //genero e salvo il token
    const token = generateToken(user.id, tokenTypeReset)
    await ctx.prisma.token.create({
      data: {
        token: token,
      },
    })

    //mando email con il token
    await sendEmail(
      email,
      `${process.env.AMBIENTE}/user/change-password/${token}`,
      'Rispristina password',
      'Clicka sul seguente link per ripristinare la tua password',
    )

    return true
  },
})
