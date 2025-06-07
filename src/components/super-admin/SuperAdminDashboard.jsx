import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getToken, logout, getUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserX, Trash2, CheckCircle, XCircle, AlertTriangle, Info, LogOut } from 'lucide-react'; // LogOut ditambahkan di sini

const API_BASE_URL = 'http://127.0.0.1:8000/api/superadmin';

// Komponen Modal Konfirmasi Sederhana
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Konfirmasi", cancelText = "Batal" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex items-center mb-4">
                    <AlertTriangle size={24} className="text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-sm">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};


const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const superAdminUser = getUser();

    const [pendingHrs, setPendingHrs] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loadingPending, setLoadingPending] = useState(false);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // State untuk Modal Konfirmasi
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', onConfirm: () => { } });

    const getAuthHeader = useCallback(() => {
        const token = getToken();
        if (!token) {
            console.warn("Token tidak ditemukan, mengarahkan ke login.");
            logout(navigate); // Logout jika token tidak ada
            return null;
        }
        return { headers: { Authorization: `Bearer ${token}` } };
    }, [navigate]);

    const fetchPendingHrs = useCallback(async () => {
        const authHeader = getAuthHeader();
        if (!authHeader) return;

        setLoadingPending(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/pending-hr-applications`, authHeader);
            console.log("Pending HR Applications Data:", response.data); // Logging data
            setPendingHrs(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching pending HR applications:", err.response?.data?.message || err.message);
            setError("Gagal memuat aplikasi HR yang pending.");
            if (err.response?.status === 401) logout(navigate); // Logout jika unauthorized
        } finally {
            setLoadingPending(false);
        }
    }, [getAuthHeader, navigate]);

    const fetchAllUsers = useCallback(async () => {
        const authHeader = getAuthHeader();
        if (!authHeader) return;

        setLoadingUsers(true);
        setError('');
        try {
            const response = await axios.get(`${API_BASE_URL}/users`, authHeader);
            console.log("All Users Data:", response.data); // Logging data
            setAllUsers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching all users:", err.response?.data?.message || err.message);
            setError("Gagal memuat daftar semua pengguna.");
            if (err.response?.status === 401) logout(navigate); // Logout jika unauthorized
        } finally {
            setLoadingUsers(false);
        }
    }, [getAuthHeader, navigate]);

    useEffect(() => {
        fetchPendingHrs();
        fetchAllUsers();
    }, [fetchPendingHrs, fetchAllUsers]);

    const openConfirmationModal = (title, message, onConfirmCallback, confirmText) => {
        setModalContent({ title, message, onConfirm: onConfirmCallback, confirmText });
        setIsModalOpen(true);
    };

    const handleAction = async (actionType, userId, userName = '') => {
        setSuccessMessage('');
        setError('');
        let url = '';
        let method = 'post';
        let actionDescription = '';
        let confirmButtonText = "Ya, Lanjutkan";

        switch (actionType) {
            case 'approve_hr':
                url = `${API_BASE_URL}/hr-applications/${userId}/approve`;
                actionDescription = `menyetujui ${userName} sebagai HR`;
                confirmButtonText = "Ya, Setujui";
                break;
            case 'reject_hr':
                url = `${API_BASE_URL}/hr-applications/${userId}/reject`;
                actionDescription = `menolak (dan menghapus) aplikasi HR dari ${userName}`;
                confirmButtonText = "Ya, Tolak & Hapus";
                break;
            case 'delete_user':
                url = `${API_BASE_URL}/users/${userId}`;
                method = 'delete';
                actionDescription = `menghapus pengguna ${userName}? Tindakan ini tidak dapat dibatalkan.`;
                confirmButtonText = "Ya, Hapus Pengguna";
                break;
            default:
                return;
        }

        openConfirmationModal(
            `Konfirmasi Tindakan`,
            `Apakah Anda yakin ingin ${actionDescription}?`,
            async () => {
                setIsModalOpen(false);
                const authHeader = getAuthHeader();
                if (!authHeader) return;

                try {
                    if (method === 'post') {
                        await axios.post(url, {}, authHeader);
                    } else if (method === 'delete') {
                        await axios.delete(url, authHeader);
                    }
                    setSuccessMessage(`Tindakan ${actionType.replace('_', ' ')} untuk ${userName} berhasil.`);
                    fetchPendingHrs();
                    fetchAllUsers();
                } catch (err) {
                    console.error(`Error during ${actionType}:`, err.response?.data?.message || err.message);
                    setError(err.response?.data?.message || `Gagal melakukan tindakan ${actionType.replace('_', ' ')}.`);
                    if (err.response?.status === 401) logout(navigate);
                }
            },
            confirmButtonText
        );
    };

    const handleUserLogout = () => {
        logout(navigate);
    };

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={modalContent.onConfirm}
                title={modalContent.title}
                message={modalContent.message}
                confirmText={modalContent.confirmText}
            />

            <header className="mb-8 p-6 bg-white shadow-lg rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Super Admin Dashboard</h1>
                        <p className="text-gray-600 mt-1">Selamat datang, <span className="font-semibold">{superAdminUser?.name || 'Super Admin'}</span>!</p>
                    </div>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 border-l-4 border-red-500 rounded-md shadow-md flex items-center">
                    <XCircle size={20} className="mr-3" />
                    <span className="text-sm">{error}</span>
                </div>
            )}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 border-l-4 border-green-500 rounded-md shadow-md flex items-center">
                    <CheckCircle size={20} className="mr-3" />
                    <span className="text-sm">{successMessage}</span>
                </div>
            )}

            {/* Bagian Aplikasi HR Pending */}
            <section className="mb-10 bg-white p-6 shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b border-gray-200 pb-3">Aplikasi HR Menunggu Persetujuan</h2>
                {loadingPending ? <p className="text-gray-500 text-center py-4">Memuat data aplikasi HR...</p> : (
                    pendingHrs.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perusahaan & Jabatan</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pendingHrs.map(hr => (
                                        <tr key={hr.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hr.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hr.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {hr.company_name || '-'} ({hr.job_title || 'HR'})
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-center">
                                                <button onClick={() => handleAction('approve_hr', hr.id, hr.name)} className="text-green-600 hover:text-green-800 font-semibold py-1 px-3 rounded-md bg-green-100 hover:bg-green-200 transition-all duration-150 ease-in-out inline-flex items-center shadow-sm hover:shadow-md">
                                                    <ShieldCheck size={16} className="mr-1.5" /> Approve
                                                </button>
                                                <button onClick={() => handleAction('reject_hr', hr.id, hr.name)} className="text-red-600 hover:text-red-800 font-semibold py-1 px-3 rounded-md bg-red-100 hover:bg-red-200 transition-all duration-150 ease-in-out inline-flex items-center shadow-sm hover:shadow-md">
                                                    <UserX size={16} className="mr-1.5" /> Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <Info size={24} className="text-blue-500 mx-auto mb-2" />
                            <p className="text-gray-500">Tidak ada aplikasi HR yang menunggu persetujuan saat ini.</p>
                        </div>
                    )
                )}
            </section>

            {/* Bagian Semua Pengguna */}
            <section className="bg-white p-6 shadow-xl rounded-xl">
                <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b border-gray-200 pb-3">Daftar Semua Pengguna</h2>
                {loadingUsers ? <p className="text-gray-500 text-center py-4">Memuat data pengguna...</p> : (
                    allUsers.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">HR Approved</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {allUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full
                                                    ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                                                        user.role === 'hr' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                {user.role === 'hr' ? (
                                                    user.is_hr_approved_by_sa ?
                                                        <span className="text-green-600 font-semibold">Ya</span> :
                                                        <span className="text-yellow-600 font-semibold">Tidak</span>
                                                ) : <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                {user.role !== 'superadmin' ? (
                                                    <button onClick={() => handleAction('delete_user', user.id, user.name)} className="text-red-600 hover:text-red-800 font-semibold py-1 px-3 rounded-md bg-red-100 hover:bg-red-200 transition-all duration-150 ease-in-out inline-flex items-center shadow-sm hover:shadow-md">
                                                        <Trash2 size={16} className="mr-1.5" /> Delete
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 italic text-xs">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <Info size={24} className="text-blue-500 mx-auto mb-2" />
                            <p className="text-gray-500">Tidak ada pengguna terdaftar.</p>
                        </div>
                    )
                )}
            </section>
        </div>
    );
};

export default SuperAdminDashboard;