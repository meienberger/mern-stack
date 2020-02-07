import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { PORT } from './config'
import DBConnection from './db'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

// Routes
routes(app, '/api')

// Init MongoDB connection
const dbConn = new DBConnection()
dbConn.startup()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
