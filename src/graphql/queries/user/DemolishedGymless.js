import { extendType } from '@nexus/schema'

export const demolishedGymless = extendType({
  type: 'Query',
  definition(t) {
    t.field('demolishedGymless', {
      type: 'Int',
      resolve: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (!user) throw new Error('Utente non trovato')

        return ctx.prisma.usersOnWorkouts.count({
          where: {
            userId: ctx.userId,
            AND: {
              attended: true,
            },
          },
        })
      },
    })
  },
})
