// src/pages/PendingApprovalPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../utils/auth';

const PendingApprovalPage = () => {
    const navigate = useNavigate();
    const user = getUser();

    // Jika tidak ada user atau tidak terautentikasi, redirect ke login
    // Ini juga mencegah user yang bukan HR pending mengakses halaman ini secara langsung
    React.useEffect(() => {
        if (!isAuthenticated() || (user && user.role === 'hr' && user.is_hr_approved_by_sa === true) || (user && user.role === 'user') || (user && user.role === 'superadmin')) {
            navigate(user ? (user.role === 'superadmin' ? '/superadmin/dashboard' : '/dashboard') : '/masuk');
        }
    }, [user, navigate]);


    const handleUserLogout = () => {
        // Di sini Anda bisa memanggil API backend /api/logout jika diperlukan
        // import axios from 'axios';
        // const token = getToken();
        // if (token) {
        //     axios.post('http://127.0.0.1:8000/api/logout', {}, {
        //         headers: { Authorization: `Bearer ${token}` }
        //     }).catch(error => console.error("Error calling backend logout:", error));
        // }
        logout(navigate);
    };

    if (!user || user.role !== 'hr' || user.is_hr_approved_by_sa !== false) {
        // Jika user null, atau bukan HR, atau HR tapi sudah diapprove, jangan render apa-apa (karena akan redirect)
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4 text-center">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full">
                <svg className="w-16 h-16 text-yellow-500 mx-auto mb-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    <path d="M12 4.5A7.5 7.5 0 004.5 12"></path>
                </svg>
                <h1 className="text-3xl font-bold text-yellow-700 mb-4">Menunggu Persetujuan</h1>
                <p className="text-gray-700 mb-3 text-lg">
                    Halo, <span className="font-semibold">{user?.name || 'Calon HR'}</span>!
                </p>
                <p className="text-gray-600 mb-8">
                    Akun Anda sebagai Departemen HR telah berhasil didaftarkan. Saat ini, akun Anda sedang dalam proses peninjauan dan menunggu persetujuan dari Super Admin.
                    Anda akan menerima notifikasi atau dapat mencoba login kembali nanti untuk mengakses fitur HR setelah akun Anda disetujui.
                </p>
                <div className="space-y-3">
                    <Link
                        to="/"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                    >
                        Kembali ke Halaman Utama
                    </Link>
                    <button
                        onClick={handleUserLogout}
                        className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovalPage;