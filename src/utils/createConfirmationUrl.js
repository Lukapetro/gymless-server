import { prisma } from '../context'
import { tokenTypeConfirmation } from './costants'
import { generateToken } from './generateToken'

export const createConfirmationUrl = async (userId) => {
  const token = generateToken(userId, tokenTypeConfirmation)

  await prisma.token.create({
    data: {
      token: token,
    },
  })

  return `${process.env.AMBIENTE}/user/confirm/${token}`
}
