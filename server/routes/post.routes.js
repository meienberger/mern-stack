import { PostController } from '../controllers'
import { withAuth } from '../middlewares'

/**
 * Routes
 * @param {Object} app
 */
const routes = (app, prefix) => {
  // Get all Posts
  app.get(`${prefix}/posts`, (req, res) => {
    PostController.getPosts(req, res)
  })

  // Get one post by cuid
  app.get(`${prefix}/posts/:cuid`, (req, res) => {
    PostController.getPost(req, res)
  })

  // Add a new Post
  app.post(`${prefix}/posts`, withAuth, (req, res) => {
    PostController.addPost(req, res)
  })

  // Delete a post by cuid
  app.delete(`${prefix}/posts/:cuid`, withAuth, (req, res) => {
    PostController.deletePost(req, res)
  })
}

export default routes
