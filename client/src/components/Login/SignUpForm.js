import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import Regex from '../../util/regex'

const SignUpForm = ({ submit, login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // Errors
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')

  const handleSubmit = () => {
    let error = false

    if (!Regex('email', email)) {
      error = true
      setEmailError('Wrong email format')
    } else {
      setEmailError('')
    }

    if (password.length < 8) {
      error = true
      setPasswordError('Password to weak. Use at least 8 characters')
    } else {
      setPasswordError('')
    }

    if (password !== passwordConfirm) {
      error = true
      setPasswordConfirmError('Passwords are not matching')
    } else {
      setPasswordConfirmError('')
    }

    if (!error) {
      submit({ email: email.trim().toLowerCase(), password, passwordConfirm })
    }
  }

  return (
    <>
      <TextField
        variant="filled"
        label="Email"
        name="email"
        value={email}
        error={emailError !== ''}
        helperText={emailError}
        onChange={e => setEmail(e.target.value.toLowerCase())}
      />
      <TextField
        variant="filled"
        label="Password"
        name="password"
        type="password"
        error={passwordError !== ''}
        helperText={passwordError}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Confirm password"
        name="password"
        type="password"
        error={passwordConfirmError !== ''}
        helperText={passwordConfirmError}
        value={passwordConfirm}
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => handleSubmit()}
        disabled={!email || !password || !passwordConfirm}
      >
        Sign up
      </Button>
      <p>
        Already have an account ?{' '}
        <a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => login()}>
          Login here
        </a>
      </p>
    </>
  )
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default SignUpForm
