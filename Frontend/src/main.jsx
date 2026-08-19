import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import { store } from './app/app.store.js'
import { Provider } from 'react-redux'
import Dashboard from './features/chat/pages/Dashboard.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <App />
      {/* <Dashboard/> */}

    </Provider>
  </StrictMode>,
)
