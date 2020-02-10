import jwt from 'jsonwebtoken'
import { User } from '../models'
import { JWT_SECRET } from '../config'

export const tradeTokenForUser = async token => {
  if (token === 'null') return null

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (!err) {
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
          resolve(null)
        }

        resolve(user)
      } else {
        reject(err)
      }
    })
  })
}
