// src/components/routes/UserRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, isPendingHr, isRegularUser, isApprovedHr, isSuperAdmin } from '../../utils/auth';

const UserRoute = () => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }

    if (isPendingHr()) {
        // HR yang pending diarahkan ke halaman status approval
        return <Navigate to="/pending-approval" replace />;
    }

    // Poin 1: HR yang sudah diapprove tidak boleh akses rute user biasa, arahkan ke profile HR
    if (isApprovedHr()) {
        // Jika HR mencoba akses path user, redirect ke profile HR
        // Kecuali jika path yang sedang diakses adalah path yang memang shared (misal /profile-edit jika componentnya sama)
        // Untuk simplicity, kita redirect semua path di bawah UserRoute.
        // Jika ada kebutuhan path bersama, logikanya bisa lebih kompleks.
        return <Navigate to="/hr/profile" state={{ from: location }} replace />;
    }

    // Poin 1: Super Admin tidak boleh akses rute user biasa, arahkan ke dashboard SA
    if (isSuperAdmin()) {
        return <Navigate to="/superadmin/dashboard" state={{ from: location }} replace />;
    }

    // Hanya izinkan jika benar-benar regular user
    if (!isRegularUser()) {
        // Jika role tidak dikenal setelah semua cek di atas, bisa jadi unauthorized atau error state
        // Arahkan ke halaman unauthorized atau fallback
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />; // Izinkan akses untuk regular user
};

export default UserRoute;