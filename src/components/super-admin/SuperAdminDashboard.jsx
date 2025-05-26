import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios'; // Pastikan axios sudah diinstal
import { getToken, logout, getUser } from '../../utils/auth'; // Asumsi path ini benar
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api/superadmin'; // URL base untuk API Super Admin

const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const superAdminUser = getUser(); // Mendapatkan data super admin yang login

    const [pendingHrs, setPendingHrs] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loadingPending, setLoadingPending] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const authHeader = { headers: { Authorization: `Bearer ${getToken()}` } };

    // Fungsi untuk memuat aplikasi HR yang pending
    const fetchPendingHrs = useCallback(async () => {
        setLoadingPending(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/pending-hr-applications`, authHeader);
            setPendingHrs(response.data);
        } catch (err) {
            console.error("Error fetching pending HR applications:", err.response?.data?.message || err.message);
            setError("Gagal memuat aplikasi HR yang pending.");
        } finally {
            setLoadingPending(false);
        }
    }, [authHeader]); // authHeader sebagai dependency jika token bisa berubah, tapi biasanya tidak dalam satu sesi.

    // Fungsi untuk memuat semua pengguna
    const fetchAllUsers = useCallback(async () => {
        setLoadingUsers(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, authHeader);
            setAllUsers(response.data);
        } catch (err) {
            console.error("Error fetching all users:", err.response?.data?.message || err.message);
            setError("Gagal memuat daftar semua pengguna.");
        } finally {
            setLoadingUsers(false);
        }
    }, [authHeader]);

    useEffect(() => {
        fetchPendingHrs();
        fetchAllUsers();
    }, [fetchPendingHrs, fetchAllUsers]);

    const handleAction = async (actionType, userId, userName = '') => {
        setSuccessMessage('');
        setError('');
        let url = '';
        let method = 'post';
        let confirmMessage = '';

        switch (actionType) {
            case 'approve_hr':
                url = `${API_BASE_URL}/hr-applications/${userId}/approve`;
                confirmMessage = `Apakah Anda yakin ingin menyetujui ${userName} sebagai HR?`;
                break;
            case 'reject_hr':
                url = `${API_BASE_URL}/hr-applications/${userId}/reject`; // Backend Anda mungkin DELETE
                confirmMessage = `Apakah Anda yakin ingin menolak (dan menghapus) aplikasi HR dari ${userName}?`;
                break;
            case 'delete_user':
                url = `${API_BASE_URL}/users/${userId}`;
                method = 'delete';
                confirmMessage = `Apakah Anda yakin ingin menghapus pengguna ${userName}? Tindakan ini tidak dapat dibatalkan.`;
                break;
            default:
                return;
        }

        if (window.confirm(confirmMessage)) {
            try {
                if (method === 'post') {
                    await axios.post(url, {}, authHeader);
                } else if (method === 'delete') {
                    await axios.delete(url, authHeader);
                }
                setSuccessMessage(`Tindakan ${actionType.replace('_', ' ')} untuk ${userName} berhasil.`);
                fetchPendingHrs(); // Muat ulang data pending HR
                fetchAllUsers();   // Muat ulang data semua user
            } catch (err) {
                console.error(`Error during ${actionType}:`, err.response?.data?.message || err.message);
                setError(err.response?.data?.message || `Gagal melakukan tindakan ${actionType.replace('_', ' ')}.`);
            }
        }
    };

    const handleUserLogout = () => {
        // Anda bisa memanggil API logout backend di sini jika ada logika server-side yang perlu dijalankan
        // Contoh: axios.post('http://127.0.0.1:8000/api/logout', {}, authHeader);
        logout(navigate); // Fungsi logout dari utils/auth.js
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="mb-8 p-4 bg-white shadow rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
                        <p className="text-gray-600">Selamat datang, {superAdminUser?.name || 'Super Admin'}!</p>
                    </div>
                    <button
                        onClick={handleUserLogout}
                        className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition duration-150 ease-in-out"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm">{error}</div>}
            {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded-md shadow-sm">{successMessage}</div>}

            {/* Bagian Aplikasi HR Pending */}
            <section className="mb-10 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Aplikasi HR Menunggu Persetujuan</h2>
                {loadingPending ? <p className="text-gray-500">Memuat data...</p> : (
                    pendingHrs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pendingHrs.map(hr => (
                                        <tr key={hr.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hr.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button onClick={() => handleAction('approve_hr', hr.id, hr.name)} className="text-green-600 hover:text-green-900 font-semibold py-1 px-2 rounded bg-green-100 hover:bg-green-200 transition">Approve</button>
                                                <button onClick={() => handleAction('reject_hr', hr.id, hr.name)} className="text-red-600 hover:text-red-900 font-semibold py-1 px-2 rounded bg-red-100 hover:bg-red-200 transition">Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">Tidak ada aplikasi HR yang menunggu persetujuan saat ini.</p>
                    )
                )}
            </section>

            {/* Bagian Semua Pengguna */}
            <section className="bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Daftar Semua Pengguna</h2>
                {loadingUsers ? <p className="text-gray-500">Memuat data...</p> : (
                    allUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR Approved</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                                                        user.role === 'hr' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.role === 'hr' ? (user.is_hr_approved_by_sa ? 'Ya' : 'Tidak') : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {user.role !== 'superadmin' ? ( // Super admin tidak bisa dihapus dari UI ini
                                                    <button onClick={() => handleAction('delete_user', user.id, user.name)} className="text-red-600 hover:text-red-900 font-semibold py-1 px-2 rounded bg-red-100 hover:bg-red-200 transition">Delete</button>
                                                ) : (
                                                    <span className="text-gray-400 italic">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">Tidak ada pengguna terdaftar.</p>
                    )
                )}
            </section>
        </div>
    );
};

export default SuperAdminDashboard;