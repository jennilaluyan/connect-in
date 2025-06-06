// src/pages/akun/user/PekerjaanSayaPage.jsx (atau path Anda yang sesuai)

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import itemIcon from '../../assets/item-icon.png'; // Pastikan path ini benar

const PekerjaanSayaPage = () => {
    // State untuk data dinamis, loading, dan error
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendBaseUrl = 'http://127.0.0.1:8000'; // Pastikan URL backend Anda benar

    // Fungsi untuk mengambil data pekerjaan yang diterima (hired)
    const fetchMyJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token"); // Gunakan key token yang konsisten

        if (!token) {
          setError("Autentikasi dibutuhkan untuk melihat halaman ini.");
          setLoading(false);
          return;
        }

        try {
          // Panggil endpoint yang sudah kita buat di backend
          const response = await fetch(`${backendBaseUrl}/api/user/my-jobs`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
          
          if (!response.ok) {
            const data = await response.json().catch(() => ({})); // Coba parse error, jika gagal biarkan objek kosong
            throw new Error(data.message || 'Gagal mengambil data pekerjaan saya.');
          }

          const data = await response.json();
          setMyJobs(data.data || []); // Respons paginasi Laravel ada di 'data.data'

        } catch (err) {
          console.error("Error fetching my jobs:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMyJobs();
    }, [fetchMyJobs]);

    // Helper untuk memformat tanggal jika ada di data job Anda
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
          return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
          });
        } catch (e) { return "Format tidak valid"; }
    };
    
    // Tampilan untuk loading dan error
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                <p className="ml-4 text-lg text-gray-700">Memuat Pekerjaan Saya...</p>
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
                    onClick={fetchMyJobs} 
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
                <div className="w-full md:w-64 mb-4 md:mb-0 md:mr-4">
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4">
                            <div className="flex items-center">
                                <img src={itemIcon} alt="Item icon" className="w-5 h-5 mr-2" />
                                <span className="text-gray-700 font-medium">Item saya</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-200"></div>
                        <div className="py-2 px-4">
                            {/* Link ini sekarang menjadi aktif */}
                            <Link
                                to="/pekerjaan-saya" // Sesuaikan path jika berbeda di App.jsx
                                className="block py-2 px-4 text-blue-600 border-l-4 border-blue-600 bg-blue-50 font-semibold"
                            >
                                Pekerjaan Saya
                            </Link>
                            {/* Tambahkan link lain untuk navigasi user di sini, misal ke profil */}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4">
                            <h1 className="text-2xl font-bold text-gray-800">Pekerjaan Saya</h1>
                            <p className="text-sm text-gray-500 mt-1">Berikut adalah daftar pekerjaan di mana Anda telah diterima.</p>
                        </div>
                        
                        {/* Hapus filter buttons, karena halaman ini hanya untuk pekerjaan yang diterima */}

                        {/* Job Listings */}
                        <div>
                            {myJobs.length > 0 ? (
                                myJobs.map(job => (
                                    <div key={job.id} className="px-6 py-5 flex flex-col sm:flex-row items-start justify-between border-t border-gray-100 hover:bg-gray-50">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 rounded-md bg-gray-200 mr-4 flex items-center justify-center text-white font-bold overflow-hidden">
                                                {job.company_logo_url ? (
                                                    <img src={job.company_logo_url} alt={`${job.company_name} logo`} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-2xl text-gray-500">{job.company_name ? job.company_name.charAt(0).toUpperCase() : '?'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                                    <Link to={`/job/${job.id}`}>{job.title}</Link>
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    <span className="text-gray-700 text-sm">{job.company_name}</span>
                                                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                        Diterima
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm mt-1">
                                                    Diposting oleh {job.poster?.name || 'Perusahaan'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0">
                                            <Link to={`/job/${job.id}`} className="px-5 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-sm text-center">
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">Belum Ada Pekerjaan</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Anda belum diterima di pekerjaan manapun. Teruslah mencoba dan jangan menyerah!
                                    </p>
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