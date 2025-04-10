import React, { useState, useEffect } from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";

const NotifikasiPage = () => {
    const [filter, setFilter] = useState("Semua");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulasi data notifikasi
    useEffect(() => {
        // Simulasi loading
        setLoading(true);

        setTimeout(() => {
            const dummyNotifications = [
                {
                    id: 1,
                    type: "job",
                    image: "https://via.placeholder.com/40",
                    content: "Lamaran berhasil dikirim posisi UI/UX Designer",
                    date: new Date(),
                    read: false
                },
                {
                    id: 2,
                    type: "connection",
                    image: "/path-to-profile.jpg", // Ini akan diganti dengan gambar profil sebenarnya
                    content: "Jhon Doe mengirim undangan untuk terhubung",
                    date: new Date(),
                    read: false
                },
                {
                    id: 3,
                    type: "connection",
                    image: "https://via.placeholder.com/40",
                    content: "Undangan untuk terhubung diterima",
                    date: new Date(),
                    read: false
                },
                {
                    id: 4,
                    type: "connection",
                    image: "/path-to-profile.jpg",
                    content: "Jhon Doe mengirim undangan untuk terhubung",
                    date: new Date(),
                    read: false
                },
                {
                    id: 5,
                    type: "job",
                    image: "https://via.placeholder.com/40",
                    content: "Lamaran berhasil dikirim posisi UI/UX Designer",
                    date: new Date(),
                    read: false
                },
                {
                    id: 6,
                    type: "connection",
                    image: "/path-to-profile.jpg",
                    content: "Jhon Doe mengirim undangan untuk terhubung",
                    date: new Date(),
                    read: false
                },
                {
                    id: 7,
                    type: "job",
                    image: "https://via.placeholder.com/40",
                    content: "Lamaran berhasil dikirim posisi UI/UX Designer",
                    date: new Date(),
                    read: false
                },
                {
                    id: 8,
                    type: "connection",
                    image: "/path-to-profile.jpg",
                    content: "Jhon Doe mengirim undangan untuk terhubung",
                    date: new Date(),
                    read: false
                },
                {
                    id: 9,
                    type: "job",
                    image: "https://via.placeholder.com/40",
                    content: "Lamaran berhasil dikirim posisi UI/UX Designer",
                    date: new Date(),
                    read: false
                },
                {
                    id: 10,
                    type: "connection",
                    image: "/path-to-profile.jpg",
                    content: "Jhon Doe mengirim undangan untuk terhubung",
                    date: new Date(),
                    read: false
                },
                {
                    id: 11,
                    type: "job",
                    image: "https://via.placeholder.com/40",
                    content: "Lamaran berhasil dikirim posisi UI/UX Designer",
                    date: new Date(),
                    read: false
                },
                {
                    id: 12,
                    type: "connection",
                    image: "https://via.placeholder.com/40",
                    content: "Undangan untuk terhubung diterima",
                    date: new Date(),
                    read: false
                },
                {
                    id: 13,
                    type: "connection",
                    image: "https://via.placeholder.com/40",
                    content: "Undangan untuk terhubung diterima",
                    date: new Date(),
                    read: false
                }
            ];

            setNotifications(dummyNotifications);
            setLoading(false);
        }, 1000);
    }, []);

    // Filter notifikasi berdasarkan tipe
    const filteredNotifications = notifications.filter(notification => {
        if (filter === "Semua") return true;
        if (filter === "Pekerjaan") return notification.type === "job";
        if (filter === "Koneksi") return notification.type === "connection";
        return true;
    });

    // Facebook placeholder icon
    const FacebookIcon = () => (
        <svg className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                fill="currentColor"
            />
        </svg>
    );

    // Profile placeholder icon
    const ProfileIcon = ({ src }) => (
        <img
            src={src || "/path-to-default-avatar.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
        />
    );

    return (
        <div id="notifikasi" className="min-h-screen">
            <DashboardNavbar />
            <div className="container mx-auto px-4 max-w-screen-lg">
                {/* Filter Tabs - Responsively improved */}
                <div className="flex flex-wrap justify-center sm:justify-start border-b border-gray-200 mb-4 mt-12">
                    <FilterTab
                        label="Semua"
                        isActive={filter === "Semua"}
                        onClick={() => setFilter("Semua")}
                    />
                    <FilterTab
                        label="Pekerjaan"
                        isActive={filter === "Pekerjaan"}
                        onClick={() => setFilter("Pekerjaan")}
                    />
                    <FilterTab
                        label="Koneksi"
                        isActive={filter === "Koneksi"}
                        onClick={() => setFilter("Koneksi")}
                    />
                </div>

                {/* Notification List */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="py-16 text-center text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <p className="text-lg font-medium">Tidak ada notifikasi</p>
                            <p>Notifikasi Anda akan muncul di sini</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredNotifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="px-4 py-3 flex items-start hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <div className="flex-shrink-0 mr-4">
                                        {notification.type === "job" ? (
                                            <FacebookIcon />
                                        ) : (
                                            <ProfileIcon src={notification.image} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">
                                            {notification.content}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

// Filter Tab Component - Improved for responsiveness
const FilterTab = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 sm:px-6 py-2 text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
        >
            {label}
        </button>
    );
};

export default NotifikasiPage;