import { mutationField, intArg } from '@nexus/schema'

export const bookClass = mutationField('bookClass', {
  type: 'Workout',
  args: {
    id: intArg({ required: true }),
  },
  resolve: async (parent, { id }, ctx) => {
    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    //Controllo se dispone di classi per prenotare
    if (user.classes <= 0) {
      throw new Error('Classi non sufficienti')
    }

    //Tolgo la classe all'utente
    await ctx.prisma.user.update({
      data: {
        classes: user.classes - 1,
      },
      where: {
        id: ctx.userId,
      },
    })

    //Verifico che ci sia posto disponibile nella classe
    const workout = await ctx.prisma.workout.findOne({
      where: {
        id: Number(id),
      },
    })

    if (workout.spots <= 0) {
      throw new Error('La classe è al completo')
    }

    //Iscrivo l'utente alla classe
    return ctx.prisma.workout.update({
      data: {
        spots: workout.spots - 1,
        partecipants: {
          connect: [
            {
              id: ctx.userId,
            },
          ],
        },
      },
      where: {
        id: Number(id),
      },
    })
  },
})
