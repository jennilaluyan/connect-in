import React, { useState, useEffect } from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";
import NotifikasiComponent from "./NotifikasiComponents";
const NotifikasiUserPage = () => {
  const [filter, setFilter] = useState("Semua");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setActiveNavItem } = useNavContext();

  useEffect(() => {
    setActiveNavItem("Notifikasi");
  }, []);

  // Simulasi data notifikasi USER
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const dummyNotifications = [
        {
          id: 1,
          type: "job",
          image: "/api/placeholder/40/40",
          content: "Lamaran berhasil dikirim posisi UI/UX Designer",
          date: new Date(),
          read: false
        },
        {
          id: 2,
          type: "connection",
          image: "/api/placeholder/40/40",
          content: "Jhon Doe mengirim undangan untuk terhubung",
          date: new Date(),
          read: false
        },
        {
          id: 3,
          type: "connection",
          image: "/api/placeholder/40/40",
          content: "Undangan untuk terhubung diterima",
          date: new Date(),
          read: false
        },
        {
            id: 4,
            type: "connection",
            image: "/api/placeholder/40/40",
            content: "Undangan untuk terhubung diterima",
            date: new Date(),
            read: false
          },
        {
            id: 4,
            type: "connection",
            image: "/api/placeholder/40/40",
            content: "Undangan untuk terhubung diterima",
            date: new Date(),
            read: false
          },
        {
            id: 4,
            type: "connection",
            image: "/api/placeholder/40/40",
            content: "Undangan untuk terhubung diterima",
            date: new Date(),
            read: false
          }
        // ... Tambahkan data notifikasi user lainnya
      ];

      setNotifications(dummyNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  // Define filter mapping untuk user
  const filterMapping = {
    "Pekerjaan": "job",
    "Koneksi": "connection"
  };

  // Render icon berdasarkan tipe notifikasi
  const renderIcon = (notification) => {
    if (notification.type === "job") {
      return (
        <svg className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
          <path
            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            fill="currentColor"
          />
        </svg>
      );
    } else {
      return (
        <img
          src={notification.image || "/api/placeholder/40/40"}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      );
    }
  };

  return (
    <div id="notifikasi" className="min-h-screen">
      <DashboardNavbar />
      <NotifikasiComponent
        filter={filter}
        setFilter={setFilter}
        notifications={notifications}
        loading={loading}
        filterMapping={filterMapping}
        renderIcon={renderIcon}
      />
    </div>
  );
};

export default NotifikasiUserPage;