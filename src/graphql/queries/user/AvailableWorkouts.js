import { extendType } from '@nexus/schema'

export const availableWorkouts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userAvailableWorkouts', {
      type: 'Workout',
      resolve: async (parent, args, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            date: {
              gt: new Date(),
            },
            AND: {
              partecipants: {
                none: {
                  id: ctx.userId,
                },
              },
            },
          },
        })
      },
    })
  },
})
