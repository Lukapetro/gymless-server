import { extendType } from '@nexus/schema'
import { DateTime } from '../../../utils/costants'

export const availableWorkouts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userAvailableWorkouts', {
      type: 'Workout',
      args: {
        startDate: DateTime,
        endDate: DateTime,
      },
      resolve: async (parent, { startDate, endDate }, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            date: {
              gt: startDate,
              lt: endDate,
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
