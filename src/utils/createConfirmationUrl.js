import { sign } from 'jsonwebtoken'
import { prisma } from '../context'

export const createConfirmationUrl = async (userId) => {
  const token = sign(
    {
      userId,
      timestamp: Date.now(),
    },
    process.env.APP_SECRET,
    {
      expiresIn: 1,
    },
  )

  console.log('token :>> ', token)

  await prisma.token.create({
    data: {
      userId: userId,
      token: token,
    },
  })

  return `${process.env.AMBIENTE}/user/confirm/${token}`
}
