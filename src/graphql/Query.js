import { schema } from 'nexus'

export const Query = schema.queryType({
  definition(t) {
    //t.crud.user()
    t.crud.workout()
    t.crud.workouts({
      filtering: true,
      sorting: true,
    })
    //t.crud.users()
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
