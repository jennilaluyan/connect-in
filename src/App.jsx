import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import LandingPage from './components/landing-page/LandingPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
