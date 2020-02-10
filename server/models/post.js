import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  user: { type: 'String', default: '', required: true },
  image: { type: 'String' },
})

const Post = mongoose.model('Post', postSchema)

export default Post
