import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'
import { Post } from '../../models'

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
const getPosts = async (req, res) => {
  Post.find({})
    .sort('-dateAdded')
    .exec((err, posts) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ posts })
    })
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
const addPost = async (req, res) => {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end()
  }

  const newPost = new Post({ ...req.body.post, user: req.email })

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title)
  newPost.name = sanitizeHtml(newPost.name)
  newPost.content = sanitizeHtml(newPost.content)

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true })
  newPost.cuid = cuid()
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({ post: saved })
    }
  })
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
const getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ post })
  })
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
const deletePost = async (req, res) => {
  const post = await Post.findOne({ cuid: req.params.cuid })

  if (!post) {
    res.status(500).json({ error: 'Error deleting post. Post not found.' })
    return null
  }

  if (post.user !== req.email) {
    res
      .status(500)
      .json({ error: "You are not allowed to delete other user's posts" })

    return null
  }

  await post.remove()
  res.status(200).end()
}

export default {
  getPosts,
  addPost,
  getPost,
  deletePost,
}
