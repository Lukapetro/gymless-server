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

export function getToday() {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()

  return (today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z')
}

export { APP_SECRET, getUserId }
