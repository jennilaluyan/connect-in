// src/pages/akun/user/PekerjaanSayaPage.jsx (atau path Anda yang sesuai)

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import itemIcon from '../../assets/item-icon.png'; // Pastikan path ini benar

const PekerjaanSayaPage = () => {
    // State untuk menyimpan semua lamaran dari API
    const [allApplications, setAllApplications] = useState([]);
    // State untuk menyimpan lamaran yang sudah difilter untuk ditampilkan
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("Dilamar"); // Filter default
    const backendBaseUrl = 'https://connect-in-backend-production-6073.up.railway.app';

    // --- 1. MENGAMBIL SEMUA DATA LAMARAN DARI API ---
    const fetchMyApplications = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Autentikasi dibutuhkan.");
            setLoading(false);
            return;
        }
        try {
            // Panggil endpoint BARU yang mengambil SEMUA lamaran
            const response = await fetch(`${backendBaseUrl}/api/user/my-applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal mengambil data riwayat lamaran.');

            setAllApplications(data.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyApplications();
    }, [fetchMyApplications]);

    // --- 2. LOGIKA UNTUK FILTER DATA DI SISI FRONTEND ---
    useEffect(() => {
        // Fungsi filter ini akan berjalan setiap kali 'activeFilter' atau 'allApplications' berubah
        if (activeFilter === "Dilamar") {
            setFilteredApplications(
                allApplications.filter(app => app.status === 'pending' || app.status === 'reviewed')
            );
        } else if (activeFilter === "Diterima") {
            setFilteredApplications(
                allApplications.filter(app => app.status === 'shortlisted' || app.status === 'hired')
            );
        } else if (activeFilter === "Ditolak") {
            setFilteredApplications(
                allApplications.filter(app => app.status === 'rejected')
            );
        }
    }, [activeFilter, allApplications]);

    const filters = ["Dilamar", "Diterima", "Ditolak"];

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
            case 'reviewed':
                return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Diproses</span>;
            case 'shortlisted':
            case 'hired':
                return <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Diterima</span>;
            case 'rejected':
                return <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Ditolak</span>;
            default:
                return <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">N/A</span>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-lg text-gray-700">Memuat Riwayat Lamaran...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-red-600 mb-3">Terjadi Kesalahan</h2>
                    <p className="text-red-700 mb-5">{error}</p>
                    <button
                        onClick={fetchMyApplications}
                        className="px-5 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row min-h-screen p-4 mt-8" id="pekerjaan-saya">
                {/* Left Sidebar */}
                <div className="w-full md:w-64 mb-4 md:mb-0 md:mr-8">
                    <div className="bg-white rounded-xl shadow-md sticky top-24">
                        <div className="p-4">
                            <div className="flex items-center">
                                <img src={itemIcon} alt="Item icon" className="w-5 h-5 mr-2" />
                                <span className="text-gray-700 font-medium">Item saya</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="py-2 px-4">
                            <Link
                                to="/pekerjaan-saya"
                                className="block py-2 px-4 text-blue-600 border-l-4 border-blue-600 bg-blue-50 font-semibold"
                            >
                                Pekerjaan Saya
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="px-6 py-4">
                            <h1 className="text-2xl font-semibold text-gray-800">Pekerjaan Saya</h1>
                            <p className="text-sm text-gray-500 mt-1">Lacak semua status lamaran pekerjaan Anda di sini.</p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="px-6 pb-4 flex flex-wrap gap-2 border-b border-gray-200">
                            {filters.map(filterName => (
                                <button
                                    key={filterName}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === filterName
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                    onClick={() => setActiveFilter(filterName)}
                                >
                                    {filterName}
                                </button>
                            ))}
                        </div>

                        {/* Application Listings */}
                        <div className="divide-y divide-gray-100">
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map(app => (
                                    <div key={app.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center flex-1 min-w-0">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                                {app.job_posting?.company_logo_url ? (
                                                    <img src={app.job_posting.company_logo_url} alt="logo" className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <span className="text-xl font-bold text-gray-500">{app.job_posting?.company_name?.charAt(0).toUpperCase() || 'C'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">{app.job_posting?.title || 'Judul Tidak Tersedia'}</h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    <span className="text-gray-600 text-sm truncate">{app.job_posting?.company_name || 'Perusahaan Tidak Tersedia'}</span>
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-md capitalize">
                                                        {app.job_posting?.type ? app.job_posting.type.replace('-', ' ') : ''}
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Dilamar pada: {new Date(app.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            {getStatusBadge(app.status)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-16 text-center text-gray-500">
                                    <p>Tidak ada lamaran dalam kategori "{activeFilter}".</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PekerjaanSayaPage;