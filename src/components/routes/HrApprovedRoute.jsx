// src/components/routes/HrApprovedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isApprovedHr, isPendingHr, isAuthenticated, isSuperAdmin, isRegularUser } from '../../utils/auth';

const HrApprovedRoute = () => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/masuk" state={{ from: location }} replace />;
    }

    if (isPendingHr()) {
        return <Navigate to="/pending-approval" replace />;
    }

    // Jika bukan HR yang diapprove (misalnya user biasa atau SA mencoba akses langsung path HR)
    // Arahkan ke dashboard default mereka atau halaman "Unauthorized"
    if (!isApprovedHr()) {
        if (isSuperAdmin()) return <Navigate to="/superadmin/dashboard" state={{ from: location }} replace />;
        if (isRegularUser()) return <Navigate to="/dashboard" state={{ from: location }} replace />;
        return <Navigate to="/unauthorized" state={{ from: location }} replace />; // Fallback
    }

    return <Outlet />; // Render komponen anak jika HR yang diapprove
};

export default HrApprovedRoute;