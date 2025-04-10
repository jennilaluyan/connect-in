import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import LandingPage from './components/landing-page/LandingPage'
import LoginPage from './components/login-page/LoginPage'
import RegisterPage from './components/register-page/RegisterPage'
import Dashboard from './components/dashboard/Dashboard'
import JobDetail from './components/detail-job/JobDetail'
import ConnectionsPage from './components/connections-page/ConnectionsPage'
import MessagesPage from './components/messages-page/MessagesPage'
import { NavProvider } from './components/connections-page/NavContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="src/components/login-page" element={<LoginPage />} />
        <Route path="src/components/register-page" element={<RegisterPage />} />
        <Route path="src/components/connections-page" element={<ConnectionsPage />} />
        <Route path="src/components/messages-page" element={<MessagesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
    </NavProvider>
  </StrictMode>,
)