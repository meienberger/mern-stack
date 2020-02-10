import { GET_USER, LOGOUT_USER } from '../types'

// Initial State
const initialState = null

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.data

    case LOGOUT_USER:
      return null

    default:
      return state
  }
}

/* Selectors */

// Export Reducer
export default PostReducer
