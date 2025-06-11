// src/components/admin/notifikasi/NotifikasiAdminPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import NotifikasiComponent from "../../notifikasi/NotifikasiComponents"; // Path ini sudah benar

const NotifikasiAdminPage = () => {
  const [filter, setFilter] = useState("Semua");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendBaseUrl = 'http://connect-in-backend-production-6073.up.railway.app';

  // Fungsi untuk mengambil data notifikasi dari API
  const fetchAllNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Autentikasi dibutuhkan.");
      setLoading(false);
      return;
    }
    try {
      // Panggil endpoint notifikasi yang sudah kita buat
      const response = await fetch(`${backendBaseUrl}/api/notifications?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengambil notifikasi.');
      }
      setNotifications(data.notifications?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotifications();
  }, [fetchAllNotifications]);

  // Definisikan filter mapping berdasarkan 'type' sederhana dari backend
  const filterMapping = {
    "Lamaran Baru": "new_application",
    // Tambahkan filter lain di sini jika ada notifikasi admin tipe lain
    // Contoh: "Posting Dibuat": "job_posted" (jika Anda membuat notifikasi ini)
  };

  // Fungsi untuk merender ikon yang sesuai dengan tipe notifikasi
  const renderIcon = (notification) => {
    // Render ikon berdasarkan `type` yang ada di dalam `notification.data`
    // Tipe 'new_application' berasal dari NewJobApplicationNotification.php di backend
    if (notification.type === 'new_application') {
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
          {/* Ikon untuk pelamar baru */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      );
    }
    // Ikon default jika tipe notifikasi tidak dikenali
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
    );
  };

  // Adaptasi data dari backend ke format yang diharapkan oleh NotifikasiComponent
  const adaptedNotifications = notifications.map(notif => ({
    id: notif.id,
    type: notif.data.type, // Tipe baru dari backend untuk filter
    content: notif.data.message, // Pesan notifikasi dari backend
    date: new Date(notif.created_at),
    read: !!notif.read_at, // Ubah tanggal 'read_at' menjadi boolean
  }));

  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <div className="min-h-screen">
      <div id="notifikasiAdmin">
        <NotifikasiComponent
          filter={filter}
          setFilter={setFilter}
          notifications={adaptedNotifications} // Kirim data yang sudah diadaptasi
          loading={loading}
          filterMapping={filterMapping}
          renderIcon={renderIcon}
        />
      </div>
    </div>
  );
};

export default NotifikasiAdminPage;