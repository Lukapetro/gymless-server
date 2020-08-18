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
        title: schema.stringArg(),
        description: schema.stringArg(),
        location: schema.stringArg(),
        spots: schema.intArg(),
        cordinatesId: schema.intArg(),
        date: DateTime,
      },
      resolve: async (
        _,
        { title, description, location, spots, date, cordinatesId },
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
            location,
            spots,
            date,
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
