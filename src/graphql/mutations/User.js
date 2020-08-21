import { extendType, stringArg, arg, enumType } from '@nexus/schema'

const SexType = enumType({
  name: 'Sex',
  description: 'The sex of the user',
  members: ['male', 'female', 'unknown'],
})

export const user = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: stringArg(),
        sex: SexType,
      },
      resolve: (parent, { name, email, sex }, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        return ctx.prisma.user.update({
          data: {
            name: name,
            email: email,
            sex: sex,
          },
          where: {
            id: ctx.userId,
          },
        })
      },
    })

    t.field('deleteUser', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        if (!ctx.userId) {
          throw new Error('Non auteticato')
        }

        return ctx.prisma.user.delete({
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
