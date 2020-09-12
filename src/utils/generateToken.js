import { sign } from 'jsonwebtoken'

export function generateToken(userId, tokenType) {
  const token = sign(
    {
      userId,
      timestamp: Date.now(),
      tokenType: tokenType,
    },
    process.env.APP_SECRET,
    {
      expiresIn: '1d',
    },
  )

  return token
}
