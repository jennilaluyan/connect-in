// src/components/admin/posting-pekerjaan/PostingPekerjaan.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostingPekerjaan({ jobToEdit = null, onFormSubmit, onCancel }) {
  const navigate = useNavigate();
  const initialFormData = {
    title: '',
    company_name: '',
    location: '',
    type: 'full-time',
    salary_min: '',
    salary_max: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const backendBaseUrl = 'https://connect-in-backend-production-6073.up.railway.app';

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        title: jobToEdit.title || '',
        company_name: jobToEdit.company_name || '',
        location: jobToEdit.location || '',
        type: jobToEdit.type || 'full-time',
        salary_min: jobToEdit.salary_min || '',
        salary_max: jobToEdit.salary_max || '',
        description: jobToEdit.description || '',
        requirements: jobToEdit.requirements || '',
        responsibilities: jobToEdit.responsibilities || '',
        benefits: jobToEdit.benefits || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError('');
    setSuccessMessage('');

    // Tidak lagi menggunakan FormData karena tidak ada file upload
    const payload = { ...formData };

    const token = localStorage.getItem('token');
    if (!token) {
      setGeneralError("Autentikasi gagal. Token tidak ditemukan. Silakan login kembali.");
      setLoading(false);
      return;
    }

    let url;
    let method; // Method HTTP aktual

    if (jobToEdit && jobToEdit.id) {
      url = `${backendBaseUrl}/api/hr/job-postings/${jobToEdit.id}`;
      method = 'PUT'; // Menggunakan PUT langsung karena tidak ada FormData
    } else {
      url = `${backendBaseUrl}/api/hr/job-postings`;
      method = 'POST';
    }
    console.log(`Mengirim request ${method} ke URL: ${url}`, payload);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Set Content-Type ke application/json
        },
        body: JSON.stringify(payload), // Kirim payload sebagai JSON string
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Server error. Status:", response.status, "Response Text:", responseText);
        let errorData = { message: `Request failed with status ${response.status}.` };
        try {
          errorData = JSON.parse(responseText);
        } catch (parseErr) { /* Biarkan default jika bukan JSON */ }

        if (response.status === 401) {
          setGeneralError(errorData.message || "Autentikasi gagal dari server. Silakan login kembali.");
        } else if (response.status === 422 && errorData.errors) {
          setErrors(errorData.errors);
          setGeneralError(errorData.message || 'Silakan periksa kembali data yang Anda masukkan.');
        } else {
          setGeneralError(errorData.message || `Error: ${response.status}.`);
        }
        setLoading(false);
        return;
      }

      const responseData = JSON.parse(responseText);
      setSuccessMessage(responseData.message || (jobToEdit ? 'Pekerjaan berhasil diperbarui!' : 'Pekerjaan berhasil diposting!'));

      if (onFormSubmit) {
        onFormSubmit(responseData.data);
      }

      if (!jobToEdit) {
        setFormData(initialFormData);
      }

    } catch (err) {
      console.error('Gagal mengirim data lowongan:', err);
      if (!generalError && Object.keys(errors).length === 0) {
        setGeneralError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="postingPekerjaan" className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {jobToEdit ? 'Edit Pekerjaan' : 'Posting Pekerjaan Baru'}
        </h1>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Tutup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}
      {generalError && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{generalError}</div>}

      <form onSubmit={handleSubmit}>
        {/* Judul Pekerjaan */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium mb-2">Judul / Posisi Pekerjaan</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
        </div>

        {/* Nama Perusahaan */}
        <div className="mb-6">
          <label htmlFor="company_name" className="block text-lg font-medium mb-2">Nama Perusahaan</label>
          <input type="text" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} className={`w-full p-3 border ${errors.company_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
          {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name[0]}</p>}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Lokasi */}
          <div>
            <label htmlFor="location" className="block text-lg font-medium mb-2">Lokasi Pekerjaan</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className={`w-full p-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>}
          </div>

          {/* Tipe Pekerjaan */}
          <div>
            <label htmlFor="type" className="block text-lg font-medium mb-2">Tipe Pekerjaan</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange} className={`w-full p-3 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="magang">Magang</option>
              <option value="kontrak">Kontrak</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>}
          </div>
        </div>

        {/* Gaji */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Gaji (Opsional)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="salary_min" className="block text-sm mb-1">Minimal (cth: 5000000)</label>
              <input type="number" id="salary_min" name="salary_min" value={formData.salary_min} onChange={handleChange} placeholder="Rp" className={`w-full p-3 border ${errors.salary_min ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} />
              {errors.salary_min && <p className="text-red-500 text-sm mt-1">{errors.salary_min[0]}</p>}
            </div>
            <div>
              <label htmlFor="salary_max" className="block text-sm mb-1">Maksimal (cth: 8000000)</label>
              <input type="number" id="salary_max" name="salary_max" value={formData.salary_max} onChange={handleChange} placeholder="Rp" className={`w-full p-3 border ${errors.salary_max ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} />
              {errors.salary_max && <p className="text-red-500 text-sm mt-1">{errors.salary_max[0]}</p>}
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium mb-2">Deskripsi Pekerjaan</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="6" className={`w-full p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
        </div>

        {/* Persyaratan */}
        <div className="mb-6">
          <label htmlFor="requirements" className="block text-lg font-medium mb-2">Persyaratan (Requirements)</label>
          <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows="6" className={`w-full p-3 border ${errors.requirements ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required></textarea>
          {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements[0]}</p>}
        </div>

        {/* Tanggung Jawab */}
        <div className="mb-6">
          <label htmlFor="responsibilities" className="block text-lg font-medium mb-2">Tanggung Jawab (Responsibilities)</label>
          <textarea id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows="6" className={`w-full p-3 border ${errors.responsibilities ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`} required></textarea>
          {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities[0]}</p>}
        </div>

        {/* Manfaat */}
        <div className="mb-6">
          <label htmlFor="benefits" className="block text-lg font-medium mb-2">Manfaat (Benefits) (Opsional)</label>
          <textarea id="benefits" name="benefits" value={formData.benefits} onChange={handleChange} rows="4" className={`w-full p-3 border ${errors.benefits ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}></textarea>
          {errors.benefits && <p className="text-red-500 text-sm mt-1">{errors.benefits[0]}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-300 disabled:opacity-50"
          >
            {loading ? (jobToEdit ? 'Menyimpan...' : 'Memposting...') : (jobToEdit ? 'Simpan Perubahan' : 'Posting Pekerjaan')}
          </button>
        </div>
      </form>
    </div>
  );
}
