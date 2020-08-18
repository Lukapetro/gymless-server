import { mutationField, idArg } from '@nexus/schema'

export const deleteBooking = mutationField('deleteBooking', {
  type: 'Workout',
  args: {
    id: idArg(),
  },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.workout.update({
      data: {
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
