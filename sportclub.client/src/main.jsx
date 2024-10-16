import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppRouter from './Router';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <AppRouter />
  </StrictMode>,
)
