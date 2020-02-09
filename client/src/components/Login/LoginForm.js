import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({ submit, register }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit({ email, password })}
        disabled={!email || !password}
      >
        Login
      </Button>
      <p>
        Don't have an account yet ?{' '}
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

export default LoginForm
