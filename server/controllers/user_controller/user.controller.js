import jwt from 'jsonwebtoken'
import { User } from '../../models'
import { JWT_SECRET } from '../../config'

const createUser = async (req, res) => {
  const { email, password } = req.body

  const registeredUser = await User.findOne({ email })

  if (registeredUser) {
    res.status(500).json({ error: 'Email already in use' })
  }

  const user = await User.create({
    email,
    password,
  })

  if (!user) {
    res
      .status(500)
      .json({ error: 'Error registering new user please try again.' })
  } else {
    const payload = { email }
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('token', token, { httpOnly: true }).sendStatus(200)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) res.status(500).json({ error: 'No user found for given email' })

  user.isCorrectPassword(password, (err, same) => {
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

      res.cookie('token', token, { httpOnly: true }).sendStatus(200)
    }
  })
}

const getUser = async (req, res) => {
  console.log(req.cookie)
}

export default {
  createUser,
  login,
  getUser,
}
