// src/components/admin/akun-posting-pekerjaan/PekerjaanDiposting.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PostingPekerjaan from "../posting-pekerjaan/PostingPekerjaan"; // Sesuaikan path jika perlu

// Helper functions (bisa dipindah ke file utilitas terpisah)
const formatSalary = (min, max) => {
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
  const numMin = parseFloat(min);
  const numMax = parseFloat(max);

  if (!isNaN(numMin) && numMin > 0 && !isNaN(numMax) && numMax > 0 && numMin <= numMax) {
    return `${formatter.format(numMin)} - ${formatter.format(numMax)}`;
  }
  if (!isNaN(numMin) && numMin > 0) {
    return `Mulai ${formatter.format(numMin)}`;
  }
  if (!isNaN(numMax) && numMax > 0) {
    return `Hingga ${formatter.format(numMax)}`;
  }
  return "Gaji tidak ditampilkan";
};

const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return "Format tanggal tidak valid";
  }
};

const PekerjaanDiposting = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const backendBaseUrl = 'http://connect-in-backend-production-6073.up.railway.app';

  const fetchHrJobs = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    console.log('Token yang digunakan untuk fetchHrJobs (PekerjaanDiposting):', token);

    if (!token) {
      setError("Autentikasi dibutuhkan. Token tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendBaseUrl}/api/hr/my-job-postings?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Server (fetchHrJobs) error. Status:", response.status, "Response Text:", responseText);
        let errorData = { message: `Request failed with status ${response.status}. Server response: ${responseText.substring(0, 200)}...` };
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.warn("Failed to parse error response as JSON (fetchHrJobs):", responseText);
        }

        if (response.status === 401) {
          setError(errorData.message || "Sesi Anda telah berakhir atau token tidak valid. Silakan login kembali.");
        } else if (response.status === 404) {
          setError(errorData.message || `API endpoint tidak ditemukan (404) saat mengambil pekerjaan Anda.`);
        } else {
          setError(errorData.message || `Gagal mengambil data pekerjaan: Status ${response.status}`);
        }
        setLoading(false);
        return;
      }

      try {
        const data = JSON.parse(responseText);
        setJobListings(data.data || []);
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.last_page || 1);
        setTotalJobs(data.total || 0);
      } catch (jsonParseError) {
        console.error("Gagal parse JSON dari respons sukses (fetchHrJobs):", jsonParseError, "Response Text:", responseText);
        setError("Menerima respons sukses, tetapi format data pekerjaan tidak valid.");
      }

    } catch (err) {
      console.error("Error fetching HR job listings (catch luar):", err);
      if (!error) setError(err.message || "Terjadi kesalahan jaringan saat mengambil data pekerjaan.");
    } finally {
      setLoading(false);
    }
  }, [backendBaseUrl]);

  useEffect(() => {
    fetchHrJobs(currentPage);
  }, [fetchHrJobs, currentPage]);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pekerjaan ini? Tindakan ini tidak dapat diurungkan.")) {
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Autentikasi gagal untuk menghapus.");
      return;
    }
    try {
      const response = await fetch(`${backendBaseUrl}/api/hr/job-postings/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errData = { message: `Gagal menghapus pekerjaan. Status: ${response.status}. Server: ${errorText.substring(0, 100)}...` };
        try {
          errData = JSON.parse(errorText);
        } catch (e) { /* biarkan default jika bukan json */ }
        throw new Error(errData.message);
      }

      let successMessage = 'Pekerjaan berhasil dihapus!';
      if (response.status === 200) {
        const data = await response.json().catch(() => null);
        if (data && data.message) successMessage = data.message;
      }
      alert(successMessage);
      fetchHrJobs(jobListings.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage);
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowPostJobModal(true);
  };

  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setShowPostJobModal(true);
  };

  const handleFormSubmitSuccess = (updatedOrNewJob) => {
    setShowPostJobModal(false);
    setEditingJob(null);
    fetchHrJobs(editingJob ? currentPage : 1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen">
      {showPostJobModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-8 pb-8">
          <div className="relative w-full max-w-4xl">
            <PostingPekerjaan
              jobToEdit={editingJob}
              onFormSubmit={handleFormSubmitSuccess}
              onCancel={() => { setShowPostJobModal(false); setEditingJob(null); }}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 mt-4 md:mt-8">
        <div id="pekerjaan-diposting" className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Kiri */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md sticky top-20">
              <div className="p-4">
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium">Item saya</span>
                </div>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="py-2">
                <Link
                  to="/hr/pekerjaan-diposting"
                  className="block py-3 px-4 text-blue-600 bg-blue-50 border-l-4 border-blue-600 font-medium"
                >
                  Pekerjaan yang diposting
                </Link>
                <Link
                  to="/hr/pelamar"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Pelamar
                </Link>
                <button
                  onClick={handleOpenCreateModal}
                  className="w-full mt-4 text-left py-3 px-4 text-white bg-green-500 hover:bg-green-600 transition-colors font-medium rounded-b-lg lg:rounded-b-none lg:mt-2"
                >
                  + Posting Pekerjaan Baru
                </button>
              </div>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800">Pekerjaan yang Anda Posting ({totalJobs})</h1>
              </div>

              {loading && <div className="text-center py-10">Memuat pekerjaan Anda...</div>}
              {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center" role="alert">Error: {error}</div>}

              {!loading && !error && jobListings.length === 0 && (
                <div className="px-6 py-10 text-center text-gray-500">
                  Anda belum memposting pekerjaan apapun.
                  <button onClick={handleOpenCreateModal} className="mt-4 text-blue-500 hover:underline">
                    Posting pekerjaan pertama Anda sekarang!
                  </button>
                </div>
              )}

              {!loading && !error && jobListings.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {jobListings.map((job) => (
                    <div key={job.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-start gap-4">
                        {/* Logo Perusahaan Dihapus, diganti dengan placeholder huruf pertama */}
                        <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 font-bold flex-shrink-0 text-2xl">
                          {job.company_name ? job.company_name.charAt(0).toUpperCase() : 'P'}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm">
                            <span className="text-gray-700">{job.company_name}</span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-md capitalize">
                              {job.type ? job.type.replace('-', ' ') : 'N/A'}
                            </span>
                            <span className="text-gray-600 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-gray-400">
                                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001zm.612-1.426a.75.75 0 0 1 1.06 0l.094.093a.75.75 0 0 1-1.06 1.06l-.093-.093a.75.75 0 0 1 0-1.06zM10 2.5a.75.75 0 0 1 .75.75v.099c.044.025.087.052.13.082l.093.064a.75.75 0 0 1 .385 1.007l-.05.096a8.502 8.502 0 0 1-4.017 4.017l-.096.05a.75.75 0 0 1-1.007-.385l-.064-.093a.75.75 0 0 1 .082-.13V3.25A.75.75 0 0 1 10 2.5zM5.12 7.198a.75.75 0 0 1 1.06-.002l.093.094a.75.75 0 0 1 .002 1.06l-.094.093a.75.75 0 0 1-1.06-.002l-.093-.094a.75.75 0 0 1-.002-1.06l.094-.093zM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" clipRule="evenodd" />
                                <path d="M10 1C5.03 1 1 5.03 1 10s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001c2.54-.956 4.692-3.108 5.648-5.648l.001-.002C16.02 13.11 16 13 16 13s-.02-.11-.066-.308l-.001-.003c-.956-2.54-3.108-4.692-5.648-5.648l-.003-.001C10.11 3.98 10 4 10 4s-.11-.02-.308.066l-.002.001c-2.54.956-4.692 3.108-5.648 5.648l-.001.002C3.98 10.11 4 10 4 10s.02.11.066.308l.001.003c.956 2.54 3.108 4.692 5.648 5.648z" />
                              </svg>
                              {job.location}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            Gaji: {formatSalary(job.salary_min, job.salary_max)}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Diposting: {formatDate(job.created_at)}
                            {job.poster && <span className="italic"> oleh {job.poster.name}</span>}
                            {job.created_at !== job.updated_at && <span className="italic text-gray-400"> (diperbarui: {formatDate(job.updated_at)})</span>}
                          </p>

                          <div className="mt-3 space-x-3">
                            <button
                              onClick={() => handleEditJob(job)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium inline-flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && !error && jobListings.length > 0 && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex justify-center items-center">
                  <nav className="flex items-center space-x-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      &laquo; Sebelumnya
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1.5 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Berikutnya &raquo;
                    </button>
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

export default PekerjaanDiposting;
