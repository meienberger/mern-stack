import { UserController } from '../controllers'
import { withAuth } from '../middlewares'

/**
 * Routes
 * @param {Object} app
 */
const routes = (app, prefix) => {
  // Register user
  app.post(`${prefix}/signup`, (req, res) => {
    UserController.createUser(req, res)
  })

  app.post(`${prefix}/login`, (req, res) => {
    UserController.login(req, res)
  })

  app.get(`${prefix}/user`, (req, res) => {
    UserController.getUser(req, res)
  })

  app.post(`${prefix}/logout`, (req, res) => {
    UserController.logout(req, res)
  })

  app.get('/validate_token', withAuth, (req, res) => {
    res.sendStatus(200)
  })
}

export default routes
