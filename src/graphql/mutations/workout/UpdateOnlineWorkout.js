import { booleanArg, intArg, mutationField, stringArg } from '@nexus/schema'
import { DateTime } from '../../../utils/costants'

export const updateOnlineWorkout = mutationField('updateOnlineWorkout', {
  type: 'Workout',
  args: {
    id: intArg({ required: true }),
    title: stringArg(),
    description: stringArg(),
    duration: intArg(),
    spots: intArg(),
    isFree: booleanArg(),
    date: DateTime,
    link: stringArg(),
    zoomId: stringArg(),
    passcode: stringArg(),
  },
  resolve: async (
    parent,
    {
      id,
      title,
      description,
      duration,
      spots,
      isFree,
      date,
      link,
      zoomId,
      passcode,
    },
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
        typology: 'online',
        onlineWorkout: {
          update: {
            link,
            zoomId,
            passcode,
          },
        },
      },
      where: {
        id: id,
      },
    })
  },
})
