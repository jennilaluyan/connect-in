import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import LandingPage from './components/landing-page/LandingPage'
import LoginPage from './components/login-page/LoginPage'
import RegisterPage from './components/register-page/RegisterPage'
import Dashboard from './components/dashboard/Dashboard'
import JobDetail from './components/detail-job/JobDetail'
import ProfileEditPage from './components/profil/ProfileEditPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="src/components/login-page" element={<LoginPage />} />
        <Route path="src/components/register-page" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)