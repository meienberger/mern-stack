import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const LoginForm = ({ submit, register, loading }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <TextField
        variant="filled"
        label="Email"
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value.toLowerCase())}
      />
      <TextField
        variant="filled"
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit({ email, password })}
        disabled={!email || !password || loading}
      >
        Login
      </Button>
      <p>
        {"Don't have an account yet ? "}
        <a
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => register()}
        >
          Register here
        </a>
      </p>
    </>
  )
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default LoginForm
