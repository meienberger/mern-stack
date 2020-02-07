import PostRoutes from './post.routes'
import UserRoutes from './user.routes'
/**
 * Routes
 * @param {Object} app
 */
const routes = (app, prefix) => {
  PostRoutes(app, prefix)
  UserRoutes(app, prefix)
}

export default routes
