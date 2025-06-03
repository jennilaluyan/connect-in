// src/index.js atau src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./style.css"; // Pastikan path ini benar

// Layouts & Navigasi Utama
import Navbar from "./components/Navbar"; // Navbar utama yang kita diskusikan
import Footer from "./components/landing-page/Footer";
import { NavProvider } from "./components/connections-page/NavContext"; // Pastikan NavContext ini masih diperlukan

// Halaman Publik & Autentikasi
import LandingPage from "./components/landing-page/LandingPage"; // LandingPage akan mengelola navbar-nya sendiri
import LoginPage from "./components/login-page/LoginPage";
import RegisterPage from "./components/register-page/RegisterPage";
import PendingApprovalPage from "./pages/PendingApprovalPage";

// Halaman Pengguna Biasa (setelah login)
import Dashboard from "./components/dashboard/Dashboard";
import JobDetail from "./components/detail-job/JobDetail";
import ConnectionsPage from "./components/connections-page/ConnectionsPage";
import ProfileEditPage from "./components/profil/ProfileEditPage";
import PekerjaanSayaPage from "./components/pekerjaan-saya/PekerjaanSayaPage";
import MessagesUserPage from "./components/messages-page/MessagesUserPage";
import NotifikasiUserPage from "./components/notifikasi/NotifikasiUserPage";
import ProfileUserPage from "./components/profil/ProfileUserPage";

// Halaman HR Department (sebelumnya '/admin/...')
import AdminProfilePage from "./components/admin/profile/AdminProfilePage";
import MessagesAdminPage from "./components/admin/pesan/MessagesAdminPage";
import NotifikasiAdminPage from "./components/admin/notifikasi/NotifikasiAdminPage";
import PostingPekerjaan from "./components/admin/posting-pekerjaan/PostingPekerjaan";
import AkunPostingPekerjaan from "./components/admin/akun-posting-pekerjaan/AkunPostingPekerjaan";
import PekerjaanDiposting from "./components/admin/akun-posting-pekerjaan/PekerjaanDiposting";
import Pelamar from "./components/admin/akun-posting-pekerjaan/Pelamar";

// Halaman Super Admin
import SuperAdminDashboard from "./components/super-admin/SuperAdminDashboard";

// Komponen Rute Terproteksi
import SuperAdminRoute from "./components/routes/SuperAdminRoute";
import HrApprovedRoute from "./components/routes/HrApprovedRoute";
import UserRoute from "./components/routes/UserRoute";

// Utilitas Autentikasi
import { isAuthenticated, getUser, isSuperAdmin, isApprovedHr, isPendingHr, isRegularUser } from "./utils/auth";

// Komponen Layout Utama (Navbar + Children + Footer) - Hanya untuk halaman yang memerlukan Navbar utama
const MainLayout = ({ children }) => (
  <>
    <Navbar /> {/* Navbar utama akan tampil di semua halaman yang menggunakan MainLayout */}
    <main className="page-content-wrapper pt-4 pb-4 min-h-[calc(100vh-128px)]">
      {children}
    </main>
    <Footer />
  </>
);

// Komponen untuk mengarahkan pengguna yang sudah login jika mencoba akses /masuk atau /daftar
const AuthenticatedRedirect = () => {
  if (!isAuthenticated()) {
    return null; // Harusnya tidak pernah tercapai jika komponen ini hanya dirender untuk user terautentikasi
  }

  const user = getUser(); // Ambil user dari auth.js atau localStorage
  if (isSuperAdmin()) return <Navigate to="/superadmin/dashboard" replace />;
  if (isApprovedHr()) return <Navigate to="/hr/profile" replace />; // Arahkan HR ke dashboard mereka
  if (isPendingHr()) return <Navigate to="/pending-approval" replace />;
  // Untuk isRegularUser() atau default user lainnya
  return <Navigate to="/dashboard" replace />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTE PUBLIK / AUTENTIKASI */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/masuk" element={isAuthenticated() ? <AuthenticatedRedirect /> : <LoginPage />} />
          <Route path="/daftar" element={isAuthenticated() ? <AuthenticatedRedirect /> : <RegisterPage />} />
          <Route path="/pending-approval" element={<PendingApprovalPage />} />

          {/* RUTE UNTUK USER BIASA (Perlu Login & bukan HR pending) */}
          {/* UserRoute akan menangani jika user adalah regular, approved HR, atau SA */}
          <Route element={<MainLayout><UserRoute /></MainLayout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileUserPage />} />
            <Route path="/profile-edit" element={<ProfileEditPage />} /> {/* Umum untuk semua role yang bisa edit */}
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/notifikasi" element={<NotifikasiUserPage />} />
            <Route path="/pekerjaan-saya" element={<PekerjaanSayaPage />} />
            <Route path="/pesan" element={<MessagesUserPage />} />
            <Route path="/koneksi" element={<ConnectionsPage />} />
          </Route>

          {/* RUTE UNTUK HR DEPARTMENT (Perlu Login sebagai HR yang Approved) */}
          {/* HrApprovedRoute akan spesifik melindungi rute HR */}
          <Route element={<MainLayout><HrApprovedRoute /></MainLayout>}>
            <Route path="/hr/profile" element={<AdminProfilePage />} />
            <Route path="/hr/profile-edit" element={<ProfileEditPage />} />
            <Route path="/hr/pesan" element={<MessagesAdminPage />} />
            <Route path="/hr/notifikasi" element={<NotifikasiAdminPage />} />
            <Route path="/hr/posting-pekerjaan" element={<PostingPekerjaan />} />
            <Route path="/hr/akun-posting-pekerjaan" element={<AkunPostingPekerjaan />} />
            <Route path="/hr/pekerjaan-diposting" element={<PekerjaanDiposting />} />
            <Route path="/hr/pelamar" element={<Pelamar />} />
          </Route>

          {/* RUTE UNTUK SUPER ADMIN (Perlu Login sebagai Super Admin) */}
          <Route element={<MainLayout><SuperAdminRoute /></MainLayout>}>
            <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NavProvider>
  </StrictMode>
);