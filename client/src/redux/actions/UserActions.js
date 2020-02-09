import callApi from '../../util/apiCaller'
import { LOGIN_USER, SIGNUP_USER } from '../types'

export function loginUser(data) {
  return {
    type: LOGIN_USER,
    data,
  }
}

export function loginUserRequest({ email, password }) {
  return dispatch => {
    return callApi('login', 'post', {
      email,
      password,
    }).then(res => {
      if (res.error) {
        alert(res.error)
      } else {
        dispatch(loginUser(res.data))
      }
    })
  }
}

export function signUpUser(data) {
  return {
    type: SIGNUP_USER,
    data,
  }
}

export function signUpRequest({ email, password }) {
  return dispatch => {
    return callApi('signup', 'post', {
      email,
      password,
    }).then(res => {
      console.log('FDP', res)
      if (res.error) {
        alert(res.error)
      } else {
        dispatch(signUpUser(res.data))
      }
    })
  }
}
