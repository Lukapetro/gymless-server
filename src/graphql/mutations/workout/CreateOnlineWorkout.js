import { booleanArg, intArg, mutationField, stringArg } from '@nexus/schema'
import { DateTime } from '../../../utils/costants'

export const createOnlineWorkout = mutationField('CreateOnlineWorkout', {
  type: 'Workout',
  args: {
    title: stringArg({ required: true }),
    description: stringArg(),
    duration: intArg({ required: true }),
    spots: intArg({ required: true }),
    isFree: booleanArg(),
    date: DateTime,
    link: stringArg({ required: true }),
    zoomId: stringArg({ required: true }),
    passcode: stringArg({ required: true }),
  },
  resolve: async (
    parent,
    {
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

    return ctx.prisma.workout.create({
      data: {
        title,
        description,
        duration,
        isFree,
        spots,
        date,
        typology: 'online',
        trainer: {
          connect: {
            id: ctx.userId,
          },
        },
        onlineWorkout: {
          create: {
            link,
            zoomId,
            passcode,
          },
        },
        cordinates: {
          connect: {
            id: 0,
          },
        },
      },
    })
  },
})
