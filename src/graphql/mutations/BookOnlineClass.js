import { mutationField, intArg, booleanArg } from '@nexus/schema'

export const bookOnlineClass = mutationField('bookOnlineClass', {
  type: 'Workout',
  args: {
    id: intArg({ required: true }),
    isFree: booleanArg({ required: false }),
  },
  resolve: async (parent, { id, isFree }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    //Verifico che ci sia posto disponibile nella classe
    const workout = await ctx.prisma.workout.findOne({
      where: {
        id: Number(id),
      },
    })

    if (workout.spots <= 0) {
      throw new Error('La classe è al completo')
    }

    //Controllo se è una classe gratuita
    if (isFree) {
      //Iscrivo l'utente alla nuova classe
      await ctx.prisma.usersOnWorkouts.create({
        data: {
          user: {
            connect: {
              id: ctx.userId,
            },
          },
          workout: {
            connect: {
              id: Number(id),
            },
          },
        },
      })

      //Aggiorno la classe sottraendo il posto
      return ctx.prisma.workout.update({
        data: {
          spots: workout.spots - 1,
        },
        where: {
          id: Number(id),
        },
      })
    }

    //Controllo se dispone di classi per prenotare
    if (user.onlineClasses <= 0) {
      throw new Error('Classi non sufficienti')
    }

    //Tolgo la classe all'utente
    await ctx.prisma.user.update({
      data: {
        onlineClasses: user.onlineClasses - 1,
      },
      where: {
        id: ctx.userId,
      },
    })

    //Prendo la tabella referral con l'id dell'utente
    const referral = await ctx.prisma.referral.findOne({
      where: {
        referredId: user.id,
      },
    })

    //Se è referenziato e non è completato
    if (referral && !referral.completed) {
      const { classes } = await ctx.prisma.user.findOne({
        where: {
          id: referral.referrerId,
        },
      })
      //Se ci sono referral aggiorno lo stato
      await ctx.prisma.referral.update(
        {
          data: {
            completed: true,
          },
          where: {
            referredId: user.id,
          },
        },
        await ctx.prisma.user.update({
          data: {
            classes: classes + 1,
          },
          where: {
            id: referral.referrerId,
          },
        }),
      )
    }

    //Iscrivo l'utente alla nuova classe
    await ctx.prisma.usersOnWorkouts.create({
      data: {
        user: {
          connect: {
            id: ctx.userId,
          },
        },
        workout: {
          connect: {
            id: Number(id),
          },
        },
      },
    })

    //Aggiorno la classe sottraendo il posto
    return ctx.prisma.workout.update({
      data: {
        spots: workout.spots - 1,
      },
      where: {
        id: Number(id),
      },
    })
  },
})
