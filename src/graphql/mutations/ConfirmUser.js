import { mutationField, stringArg } from '@nexus/schema'
import { verify } from 'jsonwebtoken'
import { tokenTypeConfirmation } from '../../utils/costants'

export const confirmUser = mutationField('confirmUser', {
  type: 'Boolean',
  args: {
    token: stringArg({ required: true }),
  },
  resolve: async (parent, { token }, ctx) => {
    //verifico il token
    const verifiedToken = verify(token, process.env.APP_SECRET)

    //Errore se non c'è o se è scaduto
    if (
      !verifiedToken ||
      verifiedToken.tokenType !== tokenTypeConfirmation ||
      !verifiedToken.userId
    )
      throw new Error('Token non valido')

    //Confermo l'email dell'utente e cancello il token
    await ctx.prisma.user.update({
      data: {
        confirmed: true,
      },
      where: {
        id: verifiedToken.userId,
      },
    })
    await ctx.prisma.token.delete({
      where: {
        token: token,
      },
    })
    return true
  },
})
