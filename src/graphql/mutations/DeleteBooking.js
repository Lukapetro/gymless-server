import { mutationField, idArg } from '@nexus/schema'

export const deleteBooking = mutationField('deleteBooking', {
  type: 'Workout',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, ctx) => {
    var SIX_HOUR = 60 * 60 * 1000 * 6 /* ms */
    const sixHourFromNow = Date.now() + SIX_HOUR

    function updateUser() {
      return ctx.prisma.workout.update({
        data: {
          spots: +1,
          partecipants: {
            disconnect: [
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
    }

    const user = await ctx.prisma.user.findOne({
      where: {
        id: ctx.userId,
      },
    })

    if (!user) {
      throw new Error(`Non autorizzato`)
    }

    //Recupero la classe
    const workout = await ctx.prisma.workout.findOne({
      where: { id: Number(id) },
    })

    if (!workout) {
      throw new Error(`Errore: classe non trovata`)
    }

    //Controllo se la startDate è < 6H
    if (workout.date < sixHourFromNow) {
      //Non restituisco la classe
      return updateUser()
    } else {
      //Riaggiungo la classe all'utente
      await ctx.prisma.user.update({
        data: {
          classes: user.classes + 1,
        },
        where: {
          id: ctx.userId,
        },
      })

      return updateUser()
    }
  },
})
