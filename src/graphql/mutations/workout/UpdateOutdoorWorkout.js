import { booleanArg, intArg, mutationField, stringArg } from '@nexus/schema'
import { DateTime } from '../../../utils/costants'

export const updateOutdoorWorkout = mutationField('updateOutdoorWorkout', {
  type: 'Workout',
  args: {
    id: intArg({ required: true }),
    title: stringArg(),
    description: stringArg(),
    duration: intArg(),
    spots: intArg(),
    isFree: booleanArg(),
    date: DateTime,
  },
  resolve: async (
    parent,
    { id, title, description, duration, spots, isFree, date },
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

    return ctx.prisma.workout.update({
      data: {
        title,
        description,
        duration,
        isFree,
        spots,
        date,
        typology: 'outdoor',
      },
      where: {
        id: id,
      },
    })
  },
})
