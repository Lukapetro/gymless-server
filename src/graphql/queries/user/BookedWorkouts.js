import { extendType } from '@nexus/schema'

export const bookedWorkouts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('workoutsBooked', {
      type: 'Workout',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            partecipants: {
              some: {
                id: ctx.userId,
              },
            },
            AND: {
              date: {
                gt: new Date(),
              },
            },
          },
        })
      },
    })
  },
})
