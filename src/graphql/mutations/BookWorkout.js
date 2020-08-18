import { mutationField, idArg } from '@nexus/schema'

export const bookWorkout = mutationField('bookWorkout', {
  type: 'Workout',
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, ctx) => {
    if (!ctx.userId) {
      throw new Error('Not athenticated')
    }

    //Check se il pagamento è ok

    return ctx.prisma.workout.update({
      data: {
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
