import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Nav/Navbar'
import { PostListPage, PostDetailPage, LoginPage } from './pages'

function App(props) {
  return (
    <div className="w-100">
      <Provider store={props.store}>
        <Navbar />
        <div className="w-100 pt-5 mt-5">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={PostListPage} />
              <Route
                path="/posts/:cuid/:slug"
                exact
                component={PostDetailPage}
              />
              <Route path="/login" exact component={LoginPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    </div>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}

export default App
