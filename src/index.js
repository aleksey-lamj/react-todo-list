import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import TodoState from './context/state'


ReactDOM.render(
  <TodoState>
    <App />
  </TodoState>
  , document.querySelector('#root'))