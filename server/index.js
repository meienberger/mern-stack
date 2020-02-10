import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { PORT } from './config'
import DBConnection from './db'

const app = express()

// Options to allow credentials to be sent to server. (cookies)
const corsOptions = {
  origin(origin, callback) {
    callback(null, true)
  },
  credentials: true,
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
routes(app, '/api')

// Init MongoDB connection
const dbConn = new DBConnection()
dbConn.startup()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
