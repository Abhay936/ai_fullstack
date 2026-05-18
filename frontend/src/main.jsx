import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Set global base URL for all API requests
axios.defaults.baseURL = import.meta.env.PROD 
  ? 'https://ai-backend-q7l2.onrender.com' 
  : 'http://localhost:5000';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
