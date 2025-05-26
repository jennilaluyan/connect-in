// src/components/routes/SuperAdminRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isSuperAdmin } from '../../utils/auth';

const SuperAdminRoute = () => {
    const location = useLocation();

    if (!isSuperAdmin()) {
        // Jika bukan super admin (atau tidak login), redirect ke halaman login
        // Sertakan path asal agar bisa kembali setelah login jika diinginkan
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }
    return <Outlet />; // Render komponen anak jika super admin
};

export default SuperAdminRoute;