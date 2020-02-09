import { LOGIN_USER, SIGNUP_USER } from '../types'

// Initial State
const initialState = {}

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...action.data,
      }

    case SIGNUP_USER:
      return {
        ...action.data,
      }

    default:
      return state
  }
}

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data

// Get post by cuid
export const getPost = (state, cuid) =>
  state.posts.data.filter(post => post.cuid === cuid)[0]

// Export Reducer
export default PostReducer
