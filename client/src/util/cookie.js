import cookie from 'js-cookie'

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 365,
    path: '/',
  })
}

export const removeCookie = key => {
  cookie.remove(key)
}
