import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { loginUserRequest, signUpRequest } from '../../redux/actions'
import { LoginForm, SignUpForm } from '../../components'
// Import Style

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const classes = useStyles()
  const dispatch = useDispatch()

  const submitLogin = ({ email, password }) => {
    dispatch(loginUserRequest({ email, password }))
  }

  const submitSignup = ({ email, password, passwordConfirm }) => {
    if (password === passwordConfirm) {
      dispatch(signUpRequest({ email, password }))
    } else {
      alert('Error : Passwords are not matching.')
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-4"> Login to your account </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-3" />
        <div className="col-6">
          <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
            {isLogin ? (
              <LoginForm
                register={() => setIsLogin(false)}
                submit={submitLogin}
              />
            ) : (
              <SignUpForm
                login={() => setIsLogin(true)}
                submit={submitSignup}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
