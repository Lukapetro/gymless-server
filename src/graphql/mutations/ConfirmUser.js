import { mutationField, stringArg } from '@nexus/schema'

export const confirmUser = mutationField('confirmUser', {
  type: 'Boolean',
  args: {
    token: stringArg({ required: true }),
  },
  resolve: async (parent, { token }, ctx) => {
    //verifico la validità del token

    //pesco l'utente in base al token
    const { userId } = await ctx.prisma.token.findOne({
      where: {
        token: token,
      },
    })

    if (!userId) return false

    await ctx.prisma.user.update({
      data: {
        confirmed: true,
      },
      where: {
        id: userId,
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
