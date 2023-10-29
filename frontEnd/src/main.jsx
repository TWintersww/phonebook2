import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

//we no longer need a const notes = [] in main.jsx b/c of json-server

ReactDOM.createRoot(document.getElementById('root')).render(
  //notes[] with all info is stored here in main.jsx
  //passed as prop to <App>
  <App />
)
