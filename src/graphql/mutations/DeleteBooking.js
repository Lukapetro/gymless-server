import { mutationField, idArg } from '@nexus/schema'

export const deleteBooking = mutationField('deleteBooking', {
  type: 'Workout',
  args: {
    id: idArg(),
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

    //Riaggiungo la classe all'utente
    await ctx.prisma.user.update({
      data: {
        classes: user.classes + 1,
      },
      where: {
        id: ctx.userId,
      },
    })

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
  },
})
