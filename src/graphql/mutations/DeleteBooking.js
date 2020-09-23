import { mutationField, idArg } from '@nexus/schema'

export const deleteBooking = mutationField('deleteBooking', {
  type: 'Workout',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, ctx) => {
    var SIX_HOUR = 60 * 60 * 1000 * 6 /* ms */
    const sixHourFromNow = Date.now() + SIX_HOUR

    async function updateWorkout() {
      await ctx.prisma.usersOnWorkouts.delete({
        where: {
          workoutId_userId: {
            userId: ctx.userId,
            workoutId: Number(id),
          },
        },
      })

      return ctx.prisma.workout.update({
        data: {
          spots: workout.spots + 1,
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

    //Se la classe è passata non è possibile disdire
    if (workout.date < Date.now()) {
      throw new Error(`Operazione non consentita`)
    }

    //Controllo se la startDate è < 6H
    if (workout.date < sixHourFromNow) {
      //Non restituisco la classe
      return updateWorkout()
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

      return updateWorkout()
    }
  },
})
