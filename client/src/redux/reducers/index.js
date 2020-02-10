import { combineReducers } from 'redux'
import postReducer from './PostReducer'
import userReducer from './AuthReducer'

export default combineReducers({
  posts: postReducer,
  auth: userReducer,
})
