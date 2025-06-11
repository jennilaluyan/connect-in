// src/components/notifikasi/NotifikasiUserPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import NotifikasiComponent from "./NotifikasiComponents"; // Menggunakan komponen reusable Anda

const NotifikasiUserPage = () => {
  const [filter, setFilter] = useState("Semua");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendBaseUrl = 'https://connect-in-backend-production.up.railway.app';

  // Fungsi untuk mengambil semua notifikasi dari API
  const fetchAllNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token"); // Pastikan key token konsisten

    if (!token) {
      setError("Autentikasi dibutuhkan untuk melihat halaman ini.");
      setLoading(false);
      return;
    }

    try {
      // Ambil lebih banyak notifikasi untuk halaman penuh, misal limit 100
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

  // Mapping untuk filter berdasarkan 'type' sederhana dari backend
  const filterMapping = {
    "Status Lamaran": "application_status",
    // Tambahkan filter lain di sini jika ada, contoh:
    // "Koneksi": "connection_update",
  };

  // Fungsi untuk merender ikon berdasarkan tipe notifikasi
  const renderIcon = (notification) => {
    // Render ikon berdasarkan `type` yang ada di dalam `notification.data`
    if (notification.type === 'application_status') { // Menggunakan 'type' yang sudah diadaptasi
      return (
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      );
    }
    // Fallback icon jika tipe tidak dikenali
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
    );
  };

  // Adaptasi data dari backend ke format yang diharapkan oleh NotifikasiComponent
  // karena NotifikasiComponent mengharapkan properti seperti `content` dan `read`
  const adaptedNotifications = notifications.map(notif => ({
    id: notif.id,
    type: notif.data.type, // Gunakan tipe baru dari backend untuk filter
    content: notif.data.message,
    date: new Date(notif.created_at),
    read: !!notif.read_at, // Ubah tanggal 'read_at' menjadi boolean
  }));

  // Tampilkan pesan error jika ada
  if (error) return <div className="text-center text-red-500 py-10">Error: {error}</div>;

  return (
    <div id="notifikasi-user-page" className="min-h-screen">
      <NotifikasiComponent
        filter={filter}
        setFilter={setFilter}
        notifications={adaptedNotifications} // Kirim data yang sudah diadaptasi
        loading={loading}
        filterMapping={filterMapping}
        renderIcon={renderIcon}
      />
    </div>
  );
};

export default NotifikasiUserPage;