// Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar"; // Asumsi path ini benar
import JobCard from "./JobCard";   // Asumsi path ini benar
import { useNavContext } from "/src/components/connections-page/NavContext.jsx"; // Asumsi path ini benar

// Helper functions (bisa dipindah ke file utils terpisah)
const formatSalary = (min, max) => {
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
  if (min && max && parseFloat(min) > 0 && parseFloat(max) > 0) return `${formatter.format(min)} - ${formatter.format(max)}`;
  if (min && parseFloat(min) > 0) return `Mulai ${formatter.format(min)}`;
  if (max && parseFloat(max) > 0) return `Hingga ${formatter.format(max)}`;
  return "Gaji tidak ditampilkan"; // Atau "N/A" atau string kosong
};

const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch (e) {
    return "Format tanggal tidak valid";
  }
};

const Dashboard = () => {
  const { setActiveNavItem } = useNavContext();

  const [apiJobs, setApiJobs] = useState([]); // Menyimpan data asli dari API untuk halaman saat ini
  const [filteredJobsToDisplay, setFilteredJobsToDisplay] = useState([]); // Data yang akan ditampilkan setelah filter pencarian

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states dari API
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalJobs, setTotalJobs] = useState(0); // Jika diperlukan untuk tampilan

  const backendBaseUrl = 'https://connect-in-backend-production.up.railway.app';
  const jobsPerPage = 9; // Sesuaikan jika API Anda mengembalikan jumlah item per halaman yang berbeda atau jika Anda ingin client-side pagination setelah fetch semua (tidak direkomendasikan untuk data besar)

  useEffect(() => {
    setActiveNavItem('Pekerjaan');
  }, [setActiveNavItem]);

  const fetchPublicJobs = useCallback(async (page = 1, searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      // Jika Anda ingin search di backend, tambahkan query parameter search
      // Untuk saat ini, search masih client-side, jadi searchTerm tidak dipakai di URL fetch
      const response = await fetch(`${backendBaseUrl}/api/job-postings?page=${page}&limit=${jobsPerPage}`); // Tambahkan limit jika backend mendukung

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Server (fetchPublicJobs) error. Status:", response.status, "Response Text:", responseText);
        let errorData = { message: `Request failed with status ${response.status}. Server response: ${responseText.substring(0, 200)}...` };
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          console.warn("Failed to parse error response as JSON (fetchPublicJobs):", responseText);
        }
        if (response.status === 404) {
          setError(errorData.message || `API endpoint tidak ditemukan (404).`);
        } else {
          setError(errorData.message || `Gagal mengambil daftar lowongan: Status ${response.status}`);
        }
        setApiJobs([]); // Kosongkan jika error
        setFilteredJobsToDisplay([]);
        setLoading(false);
        return;
      }

      try {
        const data = JSON.parse(responseText);
        setApiJobs(data.data || []);
        setFilteredJobsToDisplay(data.data || []); // Inisialisasi filteredJobs dengan data API
        setCurrentPage(data.current_page || 1);
        setTotalPages(data.last_page || 1);
        // setTotalJobs(data.total || 0);
      } catch (jsonParseError) {
        console.error("Gagal parse JSON dari respons sukses (fetchPublicJobs):", jsonParseError, "Response Text:", responseText);
        setError("Menerima respons sukses, tetapi format data lowongan tidak valid.");
        setApiJobs([]);
        setFilteredJobsToDisplay([]);
      }

    } catch (err) {
      console.error("Error fetching public job listings (catch luar):", err);
      if (!error) setError(err.message || "Terjadi kesalahan jaringan.");
      setApiJobs([]);
      setFilteredJobsToDisplay([]);
    } finally {
      setLoading(false);
    }
  }, [backendBaseUrl, jobsPerPage]); // jobsPerPage ditambahkan jika dipakai di URL

  useEffect(() => {
    fetchPublicJobs(currentPage);
  }, [fetchPublicJobs, currentPage]);

  // Handle search results from SearchBar
  // SearchBar akan memfilter 'apiJobs' (data dari halaman API saat ini)
  // dan mengembalikan hasilnya ke 'handleSearchResults'
  const handleSearchResults = (results) => {
    if (Array.isArray(results)) {
      setFilteredJobsToDisplay(results);
      // Tidak perlu reset currentPage di sini jika search client-side pada data halaman saat ini
      // Jika search memicu API call baru, maka setCurrentPage(1) akan relevan
    } else {
      console.error("Search results is not an array:", results);
      setFilteredJobsToDisplay(apiJobs); // Kembali ke data asli jika hasil search tidak valid
    }
  };

  // Handle page changes untuk paginasi API
  const changePage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      // Data akan di-fetch ulang oleh useEffect dependency [fetchPublicJobs, currentPage]
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Tidak perlu client-side slicing jika API sudah melakukan paginasi
  // const currentJobs = filteredJobsToDisplay; // API sudah mengirim data per halaman

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust min-h as needed */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Memuat lowongan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="p-6 mb-4 text-lg text-red-700 bg-red-100 rounded-lg" role="alert">
          Error: {error}
        </div>
        <button
          onClick={() => fetchPublicJobs(1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <>
      <div id="dashboard" className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <SearchBar
              onSearchResults={handleSearchResults}
              allJobs={apiJobs} // SearchBar akan memfilter data dari API untuk halaman saat ini
            />
          </div>

          {filteredJobsToDisplay.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredJobsToDisplay.map((job) => (
                  <JobCard
                    key={job.id}
                    job={{
                      ...job, // Spread API job data
                      // Map API fields to JobCard expected props
                      postedBy: job.poster?.name || "N/A",
                      avatarImg: job.poster?.avatar_img_url, // JobCard akan handle default jika null/undefined
                      salary: formatSalary(job.salary_min, job.salary_max),
                      // company_logo_url sudah ada di 'job' jika ingin digunakan di JobCard
                      // type, location, title, company_name seharusnya sudah sesuai
                    }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => changePage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-l-md border border-gray-300 text-sm font-medium ${currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      const showPageButton =
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                      if (!showPageButton) {
                        if ((pageNum === currentPage - 2 && currentPage > 3) || (pageNum === currentPage + 2 && currentPage < totalPages - 2)) {
                          return (
                            <span key={`ellipsis-${pageNum}`} className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700 text-sm">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => changePage(pageNum)}
                          className={`px-3 py-1 border border-gray-300 text-sm font-medium ${currentPage === pageNum
                            ? 'bg-blue-500 text-white border-blue-500 z-10'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-r-md border border-gray-300 text-sm font-medium ${currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">
                {apiJobs.length > 0 && filteredJobsToDisplay.length === 0 ? "Tidak ada pekerjaan yang cocok dengan pencarian Anda." : "Saat ini belum ada lowongan yang tersedia."}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
