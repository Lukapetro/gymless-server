import { extendType } from '@nexus/schema'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateAvatar', {
      type: 'User',
      args: {
        avatarId: stringArg(),
      },
      resolve: async (parent, { avatarId }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Not athenticated')
        }

        return ctx.prisma.user.update({
          data: {
            avatarId: avatarId,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })
  },
})
