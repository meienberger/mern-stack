import callApi from '../../util/apiCaller'
import { GET_USER, LOGOUT_USER } from '../types'
import { setCookie, removeCookie } from '../../util/cookie'

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
        // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        setCookie('token', res.token)
        dispatch(getUser(res.user))
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
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        setCookie('token', res.token)
        dispatch(getUser(res.user))
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
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        removeCookie('token')
        dispatch(logoutUser())
      }
    })
  }
}
