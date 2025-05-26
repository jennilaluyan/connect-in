// src/components/routes/HrApprovedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isApprovedHr, isPendingHr, isAuthenticated } from '../../utils/auth';

const HrApprovedRoute = () => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Jika tidak login sama sekali
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }

    if (isPendingHr()) {
        // Jika HR tapi masih pending, arahkan ke halaman pending
        return <Navigate to="/pending-approval" replace />;
    }

    if (!isApprovedHr()) {
        // Jika bukan HR yang diapprove (misalnya user biasa atau SA mencoba akses langsung)
        // Arahkan ke dashboard default atau halaman "Unauthorized"
        // Untuk SA, mereka mungkin punya akses, jadi logika ini bisa disesuaikan
        // Jika SA juga dianggap bisa akses HR, maka ceknya: !isApprovedHr() && !isSuperAdmin()
        return <Navigate to="/dashboard" replace />; // Atau ke halaman "Unauthorized"
    }

    return <Outlet />; // Render komponen anak jika HR yang diapprove
};

export default HrApprovedRoute;