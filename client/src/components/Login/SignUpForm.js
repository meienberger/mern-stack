import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const SignUpForm = ({ submit, login }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <>
      <TextField
        variant="filled"
        label="Email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <TextField
        variant="filled"
        label="Confirm password"
        name="password"
        type="password"
        value={passwordConfirm}
        onChange={e => setPasswordConfirm(e.target.value)}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit({ email, password, passwordConfirm })}
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
