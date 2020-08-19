import { extendType, stringArg } from '@nexus/schema'

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg(),
      },
      resolve: (parent, { name, email }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        return ctx.prisma.user.update({
          data: {
            name: name,
            email: email,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

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
