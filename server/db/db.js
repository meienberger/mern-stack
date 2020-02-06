import mongoose from 'mongoose'
import { MONGO_URI } from '../config'

/**
 * Class for establish the connection with a MongoDB
 */
class DBConnection {
  constructor() {
    this.connected = false
  }

  /**
   * Performs the connection
   */
  startup = () => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise

    // Get the default connection
    const db = mongoose.connection

    const _self = this
    db.on('connected', () => {
      _self.connected = true
      console.info(`Connected to MongoDB on ${MONGO_URI}`)
    })
    db.on('error', e => console.error(`Cannot connect to MongoDB: ${e}`))
  }

  /**
   * Closes the connection
   */
  close = () => {
    if (this.connected)
      mongoose.connection.close(() => {
        this.connected = false
        console.info('Mongoose disconnected')
        process.exit(0)
      })
  }

  /**
   * Is connection connected
   */
  isConnected = () => this.connected
}

export default DBConnection
