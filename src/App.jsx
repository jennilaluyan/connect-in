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
import { NavProvider } from './components/connections-page/NavContext'
import ProfileEditPage from './components/profil/ProfileEditPage'
import PekerjaanSayaPage from './components/pekerjaan-saya/PekerjaanSayaPage'
import Footer from './components/landing-page/Footer'
import AdminProfilePage from './components/admin/profile/AdminProfilePage'
import MessagesAdminPage from './components/admin/pesan/MessagesAdminPage'
import NotifikasiAdminPage from './components/admin/notifikasi/NotifikasiAdminPage'
import MessagesUserPage from './components/messages-page/MessagesUserPage'
import NotifikasiUserPage from './components/notifikasi/NotifikasiUserPage'
import PostingPekerjaan from './components/admin/posting-pekerjaan/PostingPekerjaan'
import ProfileUserPage from './components/profil/ProfileUserPage'

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
              <LandingPage />
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
            path="/profile"
            element={
              <LayoutWithFooter>
                <ProfileUserPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/profile-edit"
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
                <NotifikasiUserPage />
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
          <Route
            path="/admin/profile"
            element={
              <LayoutWithFooter>
                <AdminProfilePage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/admin/profile-edit"
            element={
              <LayoutWithFooter>
                <ProfileEditPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/admin/pesan"
            element={
              <LayoutWithFooter>
                <MessagesAdminPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/admin/notifikasi"
            element={
              <LayoutWithFooter>
                <NotifikasiAdminPage />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/admin/posting-pekerjaan"
            element={
              <LayoutWithFooter>
                <PostingPekerjaan />
              </LayoutWithFooter>
            }
          />
          <Route
            path="/messages"
            element={
              <LayoutWithFooter>
                <MessagesUserPage />
              </LayoutWithFooter>
            }
          />
          {/* Pages without Footer */}
          <Route path="src/components/login-page" element={<LoginPage />} />
          <Route path="src/components/register-page" element={<RegisterPage />} />
          <Route path="src/components/connections-page" element={<ConnectionsPage />} />
        </Routes>
      </BrowserRouter>
    </NavProvider>
  </StrictMode>
)