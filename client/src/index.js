import React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import reducers from './redux/reducers'

// Middleware and store enhancers
const enhancers = [applyMiddleware(thunk)]

const initialStore = createStore(reducers, {}, compose(...enhancers))

ReactDOM.render(<App store={initialStore} />, document.getElementById('root'))
