import callApi from '../../util/apiCaller'
import { GET_USER, LOGOUT_USER } from '../types'
import { setCookie } from '../../util/cookie'

function getUser(data) {
  return {
    type: GET_USER,
    data,
  }
}

export function getUserRequest() {
  return dispatch => {
    return callApi('user', 'get').then(res => {
      if (!res.error) {
        dispatch(getUser(res.data))
      } else {
        alert(res.error)
      }
    })
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
        console.log(res.data)
        setCookie('token', res.data.token)
        dispatch(getUserRequest())
      }
    })
  }
}

export function signUpRequest({ email, password }) {
  return dispatch => {
    return callApi('signup', 'post', {
      email,
      password,
    }).then(res => {
      if (res.error) {
        alert(res.error)
      } else {
        dispatch(getUserRequest())
      }
    })
  }
}

function logoutUser() {
  return {
    type: LOGOUT_USER,
  }
}

export function logoutUserRequest() {
  return dispatch => {
    return callApi('logout', 'post').then(res => {
      if (res.error) {
        alert(res.error)
      } else {
        setCookie('token', null)
        dispatch(logoutUser())
      }
    })
  }
}
