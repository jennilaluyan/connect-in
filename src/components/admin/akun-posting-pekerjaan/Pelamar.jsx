// src/pages/akun/hr/Pelamar.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Pelamar = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [actionMessage, setActionMessage] = useState({});

  const backendBaseUrl = 'http://127.0.0.1:8000';

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchApplicants = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Autentikasi dibutuhkan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendBaseUrl}/api/hr/applicants?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("[Pelamar] Gagal parse JSON:", e, "Response Text:", responseText);
        setError(`Format respons tidak valid dari server: ${responseText.substring(0,100)}...`);
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.message || `Gagal mengambil data pelamar (Status: ${response.status})`);
        if (response.status === 401) {
            setError("Sesi Anda mungkin telah berakhir atau token tidak valid. Silakan login kembali.");
        }
        setLoading(false);
        return;
      }

      setApplications(data.data || []);
      setCurrentPage(data.current_page || 1);
      setTotalPages(data.last_page || 1);

    } catch (err) {
      console.error("Error fetching applicants:", err);
      if(!error) setError(err.message || "Terjadi kesalahan saat mengambil data pelamar.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants(currentPage);
  }, [fetchApplicants, currentPage]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) { return "Format tidak valid"; }
  };
  
  const handleDownloadCV = async (applicationId, applicantName = 'Pelamar', jobTitle = 'Pekerjaan') => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Autentikasi dibutuhkan. Silakan login kembali.");
      return;
    }
    
    try {
      const response = await fetch(`${backendBaseUrl}/api/hr/applicants/${applicationId}/download-cv`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) {
        let errorMessage = `Gagal mengunduh CV (Status: ${response.status}).`;
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch (e) {
            const errorText = await response.text();
            errorMessage = `Gagal mengunduh CV: ${response.statusText || response.status}. Server: ${errorText.substring(0,100)}...`;
        }
        alert(errorMessage); return;
      }
      const disposition = response.headers.get('content-disposition');
      let filename = `CV_${applicantName.replace(/[^a-zA-Z0-9_.-]/g, '_')}_${jobTitle.replace(/[^a-zA-Z0-9_.-]/g, '_')}.pdf`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/i;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) filename = decodeURIComponent(matches[1]);
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("[Pelamar] Error saat proses unduh CV:", err);
      alert("Terjadi kesalahan saat mencoba mengunduh CV.");
    }
  };

  const handleUpdateStatus = async (applicationId, action) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Autentikasi gagal. Silakan login kembali.");
      return;
    }

    setActionLoading(prev => ({ ...prev, [applicationId]: true }));
    setActionMessage(prev => ({ ...prev, [applicationId]: '' }));

    try {
      const response = await fetch(`${backendBaseUrl}/api/hr/applicants/${applicationId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        setActionMessage(prev => ({ ...prev, [applicationId]: `Gagal: ${responseData.message || response.statusText || `Error ${response.status}`}` }));
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      setActionMessage(prev => ({ ...prev, [applicationId]: responseData.message || `Lamaran berhasil diproses!`}));
      
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: responseData.data.status } : app 
        )
      );
      setTimeout(() => setActionMessage(prev => ({ ...prev, [applicationId]: '' })), 4000);
    } catch (err) {
      console.error(`Error saat ${action} lamaran:`, err);
      setActionMessage(prev => ({ ...prev, [applicationId]: err.message || `Terjadi kesalahan.`}));
    } finally {
      setActionLoading(prev => ({ ...prev, [applicationId]: false }));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Memuat data pelamar...</p>
    </div>
  );
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-3">Terjadi Kesalahan</h2>
          <p className="text-red-700 mb-5">{error}</p>
          <button 
            onClick={() => fetchApplicants(1)} 
            className="px-5 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 mt-4 md:mt-8">
        <div id="pelamar-hr" className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Kiri */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg sticky top-24">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h3m-3-7v4m-3-5h3m-3 4h3" />
                  </svg>
                  <span className="text-gray-800 font-semibold text-xl">Panel HR</span>
                </div>
              </div>
              <div className="py-3">
                <Link
                  to="/hr/pekerjaan-diposting"
                  className="flex items-center py-3.5 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Pekerjaan yang Diposting
                </Link>
                <Link
                  to="/hr/pelamar"
                  className="flex items-center py-3.5 px-6 text-blue-600 bg-blue-100 border-l-4 border-blue-500 font-semibold text-sm"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Pelamar
                </Link>
              </div>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-7 py-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Pelamar</h1>
                <p className="text-sm text-gray-500 mt-1">Berikut adalah kandidat yang telah melamar pekerjaan yang Anda posting.</p>
              </div>

              {applications.length === 0 && !loading ? (
                <div className="px-6 py-16 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Belum Ada Pelamar</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Saat ada yang melamar, mereka akan ditampilkan di sini.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <div key={application.id} className="px-5 sm:px-7 py-5 hover:bg-slate-50 transition-colors duration-150">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-x-5 gap-y-3">
                        <div className="flex items-center flex-grow min-w-0">
                          <div className="w-14 h-14 rounded-full bg-slate-200 mr-4 overflow-hidden flex-shrink-0 border border-slate-300">
                            <img
                              src={application.applicant?.avatar_img_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(application.applicant?.name || 'P')}&background=random&color=fff&size=64`}
                              alt={application.applicant?.name || "Foto Pelamar"}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(application.applicant?.name || 'P')}&background=random&color=fff&size=64`; }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-md font-semibold text-blue-600 hover:text-blue-700 truncate">{application.applicant?.name || "Nama Tidak Tersedia"}</h3>
                            <p className="text-sm text-gray-700 truncate">Melamar untuk: <span className="font-medium text-gray-800">{application.job_posting?.title || "N/A"}</span></p>
                            <p className="text-xs text-gray-500 truncate">{application.job_posting?.company_name || "N/A"}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Email: {application.applicant?.email || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end sm:text-right mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
                          <p className="text-xs text-gray-500 mb-1.5">Melamar pada: {formatDate(application.created_at)}</p>
                          
                          {/* --- TAMPILAN STATUS DAN TOMBOL AKSI --- */}
                          <div className="h-10 flex items-center"> {/* Memberi tinggi tetap agar UI tidak 'melompat' */}
                            {actionMessage[application.id] && (
                                <p className={`text-xs font-medium ${actionMessage[application.id].toLowerCase().includes('gagal') ? 'text-red-600' : 'text-green-600'}`}>
                                    {actionMessage[application.id]}
                                </p>
                            )}

                            {/* Tombol aksi hanya jika status masih bisa diubah */}
                            { (application.status === 'pending' || application.status === 'reviewed') && !actionMessage[application.id] ? (
                                <div className="flex gap-2 items-center">
                                    <button onClick={() => handleUpdateStatus(application.id, 'reject')} disabled={actionLoading[application.id]} className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-medium rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed">
                                        {actionLoading[application.id] ? 'Memproses...' : 'Tolak'}
                                    </button>
                                    <button onClick={() => handleUpdateStatus(application.id, 'accept')} disabled={actionLoading[application.id]} className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-md hover:bg-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed">
                                        {actionLoading[application.id] ? 'Memproses...' : 'Terima'}
                                    </button>
                                </div>
                            ) : application.status === 'shortlisted' && !actionMessage[application.id] ? (
                                <div className="flex gap-2 items-center">
                                    <button onClick={() => handleUpdateStatus(application.id, 'reject')} disabled={actionLoading[application.id]} className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-medium rounded-md hover:bg-red-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                        {actionLoading[application.id] ? 'Memproses...' : 'Tolak'}
                                    </button>
                                    <button onClick={() => handleUpdateStatus(application.id, 'hire')} disabled={actionLoading[application.id]} className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                        {actionLoading[application.id] ? 'Memproses...' : 'Hire'}
                                    </button>
                                </div>
                            ) : ( // Tampilkan status jika sudah final atau setelah aksi
                                <span className={`capitalize text-xs font-semibold px-2.5 py-1 rounded-full ${
                                    application.status === 'shortlisted' ? 'bg-green-100 text-green-800 ring-1 ring-green-300' :
                                    application.status === 'rejected' ? 'bg-red-100 text-red-800 ring-1 ring-red-300' :
                                    application.status === 'hired' ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300' :
                                    'bg-gray-100 text-gray-800 ring-1 ring-gray-300' // Fallback untuk pending/reviewed jika ada actionMessage
                                }`}>
                                    {application.status ? application.status.replace('_', ' ') : 'N/A'}
                                </span>
                            )}
                          </div>
                          
                          <div className="mt-3">
                            <button onClick={() => handleDownloadCV(application.id, application.applicant?.name, application.job_posting?.title)} className="px-4 py-2 bg-sky-500 text-white text-xs font-medium rounded-md hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 inline-flex items-center">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Unduh CV
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Paginasi */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex justify-center">
                  <nav className="flex items-center space-x-1">
                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1 || loading} className="px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50">&laquo; Sebelumnya</button>
                    <span className="px-3 py-1.5 text-sm">Halaman {currentPage} dari {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages || loading} className="px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50">Berikutnya &raquo;</button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pelamar;