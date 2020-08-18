import { extendType } from '@nexus/schema'
import { getToday } from '../../../utils'

export const trainerWorkout = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('futureWorkouts', {
      type: 'Workout',
      resolve: async (parent, args, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            date: {
              gt: getToday(),
            },
            AND: {
              trainerId: ctx.userId,
            },
          },
        })
      },
    })

    t.list.field('pastWorkouts', {
      type: 'Workout',
      resolve: async (parent, args, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            date: {
              lte: getToday(),
            },
            AND: {
              trainerId: ctx.userId,
            },
          },
        })
      },
    })
  },
})
