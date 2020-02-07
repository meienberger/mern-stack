import { UserController } from '../controllers'

/**
 * Routes
 * @param {Object} app
 */
const routes = (app, prefix) => {
  // Register user
  app.post(`${prefix}/register`, (req, res) => {
    UserController.createUser(req, res)
  })
}

export default routes
