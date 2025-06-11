// src/components/detail-job/JobDetail.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Default from "../../assets/Anonymous.png"; // Pastikan path ini benar
import Footer from "../landing-page/Footer"; // Pastikan path ini benar
import CVUploadModal from "./CVUploadModal"; // Pastikan path ini benar

// Helper functions
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

const parseMultilineStringToArray = (multilineString) => {
  if (!multilineString || typeof multilineString !== 'string') {
    return [];
  }
  return multilineString.split('\n').map(item => item.trim()).filter(item => item);
};


const JobDetail = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();

  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const backendBaseUrl = 'https://connect-in-backend-production-6073.up.railway.app';

  const fetchJobDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSubmitMessage('');
    try {
      const response = await fetch(`${backendBaseUrl}/api/job-postings/${jobId}`);
      const responseText = await response.text();

      if (!response.ok) {
        let errorData = { message: `Gagal mengambil detail pekerjaan. Status: ${response.status}` };
        try { errorData = JSON.parse(responseText); } catch (e) { /* abaikan jika bukan JSON */ }
        if (response.status === 404) setError(errorData.message || `Lowongan pekerjaan dengan ID ${jobId} tidak ditemukan.`);
        else setError(errorData.message || `Gagal mengambil detail pekerjaan.`);
        setJobDetail(null); setLoading(false); return;
      }
      const data = JSON.parse(responseText);
      setJobDetail(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan jaringan saat mengambil detail pekerjaan.");
      setJobDetail(null);
    } finally {
      setLoading(false);
    }
  }, [jobId, backendBaseUrl]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetail();
    }
  }, [jobId, fetchJobDetail]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert("Anda harus login terlebih dahulu untuk melamar pekerjaan.");
      navigate('/masuk', { state: { from: `/job/${jobId}` } });
      return;
    }
    if (user.role === 'hr' || user.role === 'superadmin') {
      alert("Admin dan Super Admin tidak dapat melamar pekerjaan.");
      return;
    }
    setIsModalOpen(true);
    setSubmitMessage('');
  };

  const handleCVSubmit = async (file, coverLetter) => {
    if (!file) {
      alert("Silakan pilih file CV Anda.");
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Autentikasi gagal. Silakan login kembali.");
      setIsSubmitting(false);
      setIsModalOpen(false);
      navigate('/masuk');
      return;
    }

    const formDataPayload = new FormData();
    formDataPayload.append('cv', file);
    if (coverLetter) {
      formDataPayload.append('cover_letter', coverLetter);
    }

    try {
      const response = await fetch(`${backendBaseUrl}/api/job-postings/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formDataPayload,
      });

      const responseData = await response.json();

      if (!response.ok) {
        setSubmitMessage(`Gagal melamar: ${responseData.message || `Error ${response.status}`}`);
        if (responseData.errors) {
          console.error("Validation errors:", responseData.errors);
        }
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      setSubmitMessage(responseData.message || 'Lamaran berhasil dikirim!');
      alert(responseData.message || 'Lamaran berhasil dikirim!');
      setIsModalOpen(false);
    } catch (err) {
      console.error('Gagal mengirim lamaran:', err);
      setSubmitMessage(err.message || 'Terjadi kesalahan saat mengirim lamaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Memuat detail lowongan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Kembali ke Daftar Lowongan
          </button>
        </div>
      </div>
    );
  }

  if (!jobDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Lowongan Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Detail untuk lowongan ini tidak dapat dimuat.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Kembali ke Daftar Lowongan
          </button>
        </div>
      </div>
    );
  }

  const requirementsArray = parseMultilineStringToArray(jobDetail.requirements);
  const responsibilitiesArray = parseMultilineStringToArray(jobDetail.responsibilities);
  const benefitsArray = parseMultilineStringToArray(jobDetail.benefits);

  // Logika untuk finalCompanyLogoUrl dihapus karena logo tidak lagi ditampilkan

  return (
    <div id='detail-job' className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <button onClick={handleBack} className="mr-4 p-2 rounded-full hover:bg-gray-100" aria-label="Go back">
              <BackIcon />
            </button>
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Connect IN
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-50 p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                {/* Placeholder untuk logo perusahaan (huruf pertama dari nama perusahaan) */}
                <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 font-bold flex-shrink-0 overflow-hidden mr-4 text-2xl">
                  {jobDetail.company_name ? jobDetail.company_name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{jobDetail.title}</h1>
                  <p className="text-gray-600">{jobDetail.company_name}</p>
                  <div className="mt-2">
                    <JobTypeBadge type={jobDetail.type || "N/A"} />
                  </div>
                </div>
              </div>
              <button
                onClick={handleApply}
                className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Lamar Sekarang
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <LocationIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="font-medium">{jobDetail.location}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <SalaryIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gaji</p>
                  <p className="font-medium">{formatSalary(jobDetail.salary_min, jobDetail.salary_max)}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Posting</p>
                  <p className="font-medium">{jobDetail.posted_date_formatted || formatDate(jobDetail.created_at)}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Deskripsi Pekerjaan</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{jobDetail.description}</p>
            </div>

            {requirementsArray.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Persyaratan</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {requirementsArray.map((req, index) => (
                    <li key={`req-${index}`}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {responsibilitiesArray.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Tanggung Jawab</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {responsibilitiesArray.map((resp, index) => (
                    <li key={`resp-${index}`}>{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {benefitsArray.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Benefit</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {benefitsArray.map((benefit, index) => (
                    <li key={`benefit-${index}`}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {jobDetail.poster && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <img
                    src={jobDetail.poster.avatar_img_url || Default}
                    alt={jobDetail.poster.name || "Poster"}
                    className="w-12 h-12 rounded-full mr-4 border border-gray-200"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Diposting oleh</p>
                    <p className="font-medium text-gray-800">{jobDetail.poster.name || "Tim HR"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden sticky bottom-0 p-4 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={handleApply}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Lamar Sekarang
            </button>
          </div>
        </div>
      </main>

      <CVUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCVSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
      />
      <Footer />
    </div>
  );
};

// JobTypeBadge, BackIcon, LocationIcon, SalaryIcon, CalendarIcon (sama seperti sebelumnya)
const JobTypeBadge = ({ type }) => {
  const getBadgeColor = (jobType) => {
    const upperType = jobType?.toUpperCase() || '';
    switch (upperType) {
      case "FULL-TIME": return "bg-blue-100 text-blue-800";
      case "PART-TIME": return "bg-purple-100 text-purple-800";
      case "MAGANG": return "bg-indigo-100 text-indigo-800";
      case "KONTRAK": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded inline-block ${getBadgeColor(type)}`}>
      {type ? type.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'N/A'}
    </span>
  );
};

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const LocationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const SalaryIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-.567-.267C8.07 8.488 8 8.737 8 9.01V11c0 .273.07.522.201.732A2.504 2.504 0 008.767 12a2.5 2.5 0 001.433-.268V13.5c-.221.071-.412.164-.567.267-.36.24-.753.333-1.167.333H8c-.414 0-.799-.093-1.167-.267-.367-.174-.633-.417-.633-.733V9.01c0-.316.266-.559.633-.733.368-.174.753-.267 1.167-.267h.433z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092C9.124 5.022 8.592 5 8 5H7.5a1 1 0 000 2H8v2H7.5a1 1 0 000 2H8v2H7.5a1 1 0 000 2H8c.592 0 1.124-.022 1.5-.092V13a1 1 0 102 0v-.092c.876.07 1.408.158 1.5.158H12.5a1 1 0 000-2H12V9h.5a1 1 0 000-2H12V5h-.5a1 1 0 000-2H10z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

export default JobDetail;
