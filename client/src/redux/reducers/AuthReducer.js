import { GET_USER, LOGOUT_USER } from '../types'

// Initial State
const initialState = { user: null }

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { user: action.data }

    case LOGOUT_USER:
      return { user: null }

    default:
      return state
  }
}

/* Selectors */

// Export Reducer
export default PostReducer
