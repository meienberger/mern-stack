import {} from 'dotenv/config'

const { NODE_ENV = 'development', MONGO_URI, PORT = 3000 } = process.env

export { PORT, NODE_ENV, MONGO_URI }
