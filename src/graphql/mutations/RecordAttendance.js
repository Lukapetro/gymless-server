import { mutationField, intArg } from '@nexus/schema'

export const recordAttendance = mutationField('recordAttendance', {
  type: 'Boolean',
  args: {
    userId: intArg({ required: true }),
    workoutId: intArg({ required: true }),
  },
  resolve: async (parent, { userId, workoutId }, { prisma }) => {
    await prisma.usersOnWorkouts.update({
      data: {
        attended: true,
      },
      where: {
        workoutId_userId: {
          userId,
          workoutId,
        },
      },
    })

    return true
  },
})
