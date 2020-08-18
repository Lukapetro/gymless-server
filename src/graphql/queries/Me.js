import { queryField } from '@nexus/schema'

export const me = queryField('me', {
  type: 'User',
  resolve: (parent, args, ctx) => {
    return ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })
  },
})
