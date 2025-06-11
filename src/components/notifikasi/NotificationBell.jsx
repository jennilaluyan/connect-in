// src/components/notifikasi/NotificationBell.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const backendBaseUrl = 'http://connect-in-backend-production-6073.up.railway.app'; // Pastikan URL benar
    const dropdownRef = useRef(null);

    // Fungsi untuk mengambil notifikasi dari backend
    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem("token"); // Pastikan key "token" konsisten
        if (!token) return;

        try {
            const response = await fetch(`${backendBaseUrl}/api/notifications`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setNotifications(data.notifications?.data || []);
                setUnreadCount(data.unread_count || 0);
            } else {
                console.error("Gagal mengambil notifikasi:", data.message);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Ambil notifikasi saat komponen dimuat dan setiap 30 detik
    useEffect(() => {
        fetchNotifications(); // Panggil saat pertama kali dimuat
        const interval = setInterval(fetchNotifications, 30000); // Polling setiap 30 detik
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    // Fungsi untuk menutup dropdown saat klik di luar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleMarkAllAsRead = async () => {
        const token = localStorage.getItem("token");
        if (!token || unreadCount === 0) return;
        try {
            const response = await fetch(`${backendBaseUrl}/api/notifications/mark-all-as-read`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });
            if (response.ok) {
                setUnreadCount(0);
                // Tandai semua notifikasi di state lokal sebagai sudah dibaca
                setNotifications(prev => prev.map(n => ({ ...n, read_at: new Date().toISOString() })));
            }
        } catch (error) {
            console.error("Gagal menandai notifikasi sebagai dibaca:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative text-gray-600 hover:text-blue-500 focus:outline-none"
                aria-label="Notifications"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ring-2 ring-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Notifikasi</h3>
                        {unreadCount > 0 && (
                            <button onClick={handleMarkAllAsRead} className="text-xs text-blue-500 hover:underline">
                                Tandai semua dibaca
                            </button>
                        )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {loading && notifications.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Memuat...</p>
                        ) : notifications.length === 0 ? (
                            <p className="text-gray-500 text-center py-10 px-4">Tidak ada notifikasi baru.</p>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className={`p-4 border-b border-gray-100 ${!notif.read_at ? 'bg-blue-50' : 'bg-white'}`}>
                                    <p className="text-sm text-gray-800">{notif.data.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{formatDate(notif.created_at)}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="px-4 py-2 bg-gray-50 text-center">
                        {/* Sesuaikan "to" dengan path halaman notifikasi Anda */}
                        <Link to="/notifikasi" onClick={() => setIsOpen(false)} className="text-sm font-medium text-blue-500 hover:text-blue-600">
                            Lihat Semua Notifikasi
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;