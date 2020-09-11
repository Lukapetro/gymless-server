import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { tokens } from './utils/costants'

export const prisma = new PrismaClient()

export const createContext = (ctx) => {
  let userId
  try {
    let Authorization = ''
    try {
      // for queries and mutations
      Authorization = ctx.req.get('Authorization')
    } catch (e) {
      // specifically for subscriptions as the above will fail
      Authorization = ctx?.connection?.context?.Authorization
    }
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, process.env.APP_SECRET)

    if (!verifiedToken.userId && verifiedToken.type !== tokens.access.name)
      userId = -1
    else userId = verifiedToken.userId
  } catch (e) {
    userId = -1
  }
  return {
    ...ctx,
    prisma,
    userId,
  }
}
