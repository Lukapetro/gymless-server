import { extendType } from '@nexus/schema'
import { schema } from 'nexus'
import { GraphQLDateTime } from 'graphql-iso-date'

export const DateTime = GraphQLDateTime

export const workout = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createWorkout', {
      type: 'Workout',
      args: {
        title: schema.stringArg({ required: true }),
        description: schema.stringArg(),
        duration: schema.intArg({ required: true }),
        price: schema.intArg({ required: true }),
        spots: schema.intArg({ required: true }),
        cordinatesId: schema.intArg(),
        date: DateTime,
      },
      resolve: async (
        _,
        { title, description, spots, date, cordinatesId, duration, price },
        ctx,
      ) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.userId,
          },
        })

        if (user.role !== 'trainer') {
          throw new Error('Utente non abilitato')
        }

        return ctx.prisma.workout.create({
          data: {
            title,
            description,
            duration,
            spots,
            date,
            price,
            trainer: {
              connect: {
                id: ctx.userId,
              },
            },
            cordinates: {
              connect: {
                id: cordinatesId,
              },
            },
          },
        })
      },
    })
    t.crud.updateOneWorkout()
    t.crud.deleteOneWorkout()
  },
})
