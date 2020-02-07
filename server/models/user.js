import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema } = mongoose
const saltRounds = 10

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.pre('save', function preSave(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this
    bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        next(err)
      } else {
        document.password = hashedPassword
        next()
      }
    })
  } else {
    next()
  }
})

const User = mongoose.model('User', userSchema)

export default User
