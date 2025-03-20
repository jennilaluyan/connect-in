import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import LandingPage from './components/landing-page/LandingPage'
import LoginPage from './components/login-page/LoginPage'
import RegisterPage from './components/register-page/RegisterPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="src/components/login-page" element={<LoginPage />} />
        <Route path="src/components/register-page" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
