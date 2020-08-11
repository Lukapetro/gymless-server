import { schema } from 'nexus'
import { getToday } from '../utils'

export const Query = schema.queryType({
  definition(t) {
    t.crud.workout()
    t.crud.cordinates()

    t.crud.workouts({
      args: { id: schema.stringArg({ required: true }) },
      filtering: true,
      sorting: true,
    })

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

    t.field('me', {
      type: 'User',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })
      },
    })
    t.list.field('getAvailableWorkouts', {
      type: 'Workout',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.workout.findMany({
          where: {
            partecipants: {
              none: {
                id: ctx.userId,
              },
            },
          },
        })
      },
    })
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
          },
        })
      },
    })
  },
})
