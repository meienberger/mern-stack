import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'

const withAuth = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    res
      .status(401)
      .json({ error: 'Error: You need to be logged in to perform this action' })
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Error: You need to be logged in to perform this action',
        })
      } else {
        req.email = decoded.email
        next()
      }
    })
  }
}

export default withAuth
