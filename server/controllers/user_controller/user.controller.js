import jwt from 'jsonwebtoken'
import { User } from '../../models'
import { JWT_SECRET } from '../../config'
import { tradeTokenForUser } from '../../util/auth'
import Regex from '../../util/regex'

const createUser = async (req, res) => {
  const { email, password } = req.body

  const registeredUser = await User.findOne({ email })

  if (registeredUser) {
    res.status(500).json({ error: 'Email already in use' })

    return null
  }

  if (!Regex('email', email)) {
    res.status(500).json({ error: 'Wrong email format' })
    return null
  }

  const user = await User.create({
    email: email.trim().toLowerCase(),
    password,
  })

  if (!user) {
    res
      .status(500)
      .json({ error: 'Error registering new user please try again.' })

    return null
  }

  const payload = { email }
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  })

  res.cookie('token', token, { httpOnly: true })
  res.status(200).json({ token, user })
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email.trim().toLowerCase() })

  if (!user) {
    res.status(500).json({ error: 'No user found for given email' })
    return null
  }

  user.checkPassword(password, (err, same) => {
    if (err) {
      res.status(500).json({
        error: 'Internal error please try again',
      })
    } else if (!same) {
      res.status(401).json({
        error: 'Incorrect password',
      })
    } else {
      // Create JWT token
      const payload = { email }
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
      })

      res.cookie('token', token, { httpOnly: true })
      res.status(200).json({ token, user })
    }
  })
}

const logout = async (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'logout successful' })
}

const refreshToken = async (req, res) => {
  if (req.email) {
    const payload = { email: req.email }
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token })
  } else {
    // Token was invalid
    res.clearCookie('token')
    res.status(200).end()
  }
}

const getUser = async (req, res) => {
  const { token } = req.cookies

  const user = await tradeTokenForUser(token)

  res.status(200).json({ data: user })
}

export default {
  createUser,
  login,
  logout,
  getUser,
  refreshToken,
}
