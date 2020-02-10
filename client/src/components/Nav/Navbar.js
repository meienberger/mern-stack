import React, { useEffect } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useSelector, useDispatch } from 'react-redux'
import { getUserRequest, logoutUserRequest } from '../../redux/actions'

function Navbar() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserRequest())
  }, [dispatch])

  console.log(user)

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">
          <Link href="/" className="text-white">
            Home
          </Link>
        </Typography>
        <Typography style={{ marginLeft: 20 }} variant="h6">
          {!user ? (
            <Link href="/login" className="text-white">
              Login
            </Link>
          ) : (
            <a
              style={{ cursor: 'pointer', color: 'white' }}
              onClick={() => dispatch(logoutUserRequest())}
            >
              Logout <span style={{ fontSize: 10 }}>({user.email})</span>
            </a>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
