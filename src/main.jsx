import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { YouVersionProvider } from '@youversion/platform-react-ui'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <YouVersionProvider appKey={import.meta.env.VITE_YV_APP_KEY} theme="light">
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </YouVersionProvider>
  </React.StrictMode>,
)
