import { sign, verify } from 'jsonwebtoken'
import { APP_SECRET } from './costants'
/* 
function getUserId(token) {
  const userId = token.userId
  if (!userId) {
   
  }

  return userId
}
 */

function getUserId(context) {
  console.log('context: ', context.userId)
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not Authorized!')
}

export { APP_SECRET, getUserId }
