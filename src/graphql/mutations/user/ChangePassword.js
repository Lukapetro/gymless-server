import { mutationField, stringArg } from '@nexus/schema'
import { hash } from 'bcryptjs'
import { verify } from 'jsonwebtoken'
import { tokenTypeReset } from '../../../utils/costants'

export const changePassword = mutationField('changePassword', {
  type: 'User',
  args: {
    password: stringArg({ required: true }),
    token: stringArg({ required: true }),
  },
  resolve: async (parent, { password, token }, ctx) => {
    //verifico il token
    const verifiedToken = verify(token, process.env.APP_SECRET)

    //Errore se non c'è, di topo sbagliato oppure è scaduto
    if (
      !verifiedToken ||
      verifiedToken.tokenType !== tokenTypeReset ||
      !verifiedToken.userId
    )
      throw new Error('Token non valido')

    //Prendo l'utente
    //const user = await ctx.prisma.user.findOne({where: {id:verifiedToken.userId}})

    //Cripto la password
    const hashedPassword = await hash(password, 10)

    //Cancello il token e ritorno l'utente
    await ctx.prisma.token.delete({
      where: {
        token: token,
      },
    })
    return ctx.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: verifiedToken.userId,
      },
    })
  },
})
