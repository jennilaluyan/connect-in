// src/components/routes/UserRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, isPendingHr } from '../../utils/auth';

const UserRoute = () => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Jika tidak login sama sekali, redirect ke login
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }

    if (isPendingHr()) {
        // Jika HR tapi masih pending, arahkan ke halaman pending
        // Pengguna HR pending tidak boleh mengakses dashboard user biasa atau HR
        return <Navigate to="/pending-approval" replace />;
    }

    // Jika sudah login dan bukan HR pending, izinkan akses
    // Ini akan mengizinkan user biasa, HR yang sudah diapprove, dan Super Admin
    // Proteksi lebih spesifik (misalnya hanya untuk role 'user') bisa ditambahkan di sini jika perlu
    return <Outlet />;
};

export default UserRoute;