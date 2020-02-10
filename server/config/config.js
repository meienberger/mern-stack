import {} from 'dotenv/config'

const {
  NODE_ENV = 'development',
  MONGO_URI,
  PORT = 3000,
  JWT_SECRET,
} = process.env

export { PORT, NODE_ENV, MONGO_URI, JWT_SECRET }
