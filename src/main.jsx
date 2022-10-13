// Libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
// Redux
import { Provider } from 'react-redux'
import { store } from './store/store.js'
// Components
import App from './App'
// Style
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Router>
      <Provider store={ store } >
        <App />
      </Provider>
    </Router>

)
