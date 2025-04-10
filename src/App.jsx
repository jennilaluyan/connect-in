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
import ProfileEditPage from './components/profil/ProfileEditPage'
import NotifikasiPage from './components/notifikasi/NotifikasiPage'
import PekerjaanSayaPage from './components/pekerjaan-saya/PekerjaanSayaPage'
import Footer from './components/landing-page/Footer'

// Layout component that includes Footer
const LayoutWithFooter = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavProvider>
      <BrowserRouter>
        <Routes>
          {/* Pages with Footer */}
          <Route
            path="/"
            element={
              <LayoutWithFooter>
                <LandingPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/dashboard"
            element={
              <LayoutWithFooter>
                <Dashboard />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <LayoutWithFooter>
                <ProfileEditPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/job/:id"
            element={
              <LayoutWithFooter>
                <JobDetail />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/notifikasi"
            element={
              <LayoutWithFooter>
                <NotifikasiPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/pekerjaan-saya"
            element={
              <LayoutWithFooter>
                <PekerjaanSayaPage />
              </LayoutWithFooter>
            }
          />
          {/* Pages without Footer */}
          <Route path="src/components/login-page" element={<LoginPage />} />
          <Route path="src/components/register-page" element={<RegisterPage />} />
          <Route path="src/components/connections-page" element={<ConnectionsPage />} />
          <Route path="src/components/messages-page" element={<MessagesPage />} />
        </Routes>
      </BrowserRouter>
    </NavProvider>
  </StrictMode>
)