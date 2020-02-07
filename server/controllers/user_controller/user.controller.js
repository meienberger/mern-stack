import { User } from '../../models'

const createUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.create({
    email,
    password,
  })

  if (user) {
    res.status(500).send('Error registering new user please try again.')
  } else {
    res.status(200).send('Registration successful')
  }
}

export default {
  createUser,
}
