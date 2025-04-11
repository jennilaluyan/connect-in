import React, { useState, useEffect } from "react";
import NavbarAdmin from "../profile/NavbarAdmin";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";
import NotifikasiComponent from "../../notifikasi/NotifikasiComponents";
const NotifikasiAdminPage = () => {
  const [filter, setFilter] = useState("Semua");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setActiveNavItem } = useNavContext();

  useEffect(() => {
    setActiveNavItem("Notifikasi");
  }, []);

  // Simulasi data notifikasi ADMIN
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const dummyAdminNotifications = [
        {
          id: 1,
          type: "post",
          image: "/api/placeholder/40/40",
          content: "Lowongan posisi UI/UX Designer berhasil diposting",
          date: new Date(),
          read: false
        },
        {
          id: 2,
          type: "apply",
          image: "/api/placeholder/40/40",
          content: "1 Kandidat melamar untuk posisi UI/UX Designer",
          date: new Date(),
          read: false
        },
        {
          id: 3,
          type: "post",
          image: "/api/placeholder/40/40",
          content: "Lowongan posisi Front-end Developer berhasil diposting",
          date: new Date(),
          read: true
        }
        // ... Tambahkan data notifikasi admin lainnya
      ];

      setNotifications(dummyAdminNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  // Define filter mapping untuk admin
  const filterMapping = {
    "Pekerjaan": "post",
    "Lamar": "apply"
  };

  // Render icon untuk admin (company icon untuk semua)
  const renderIcon = () => {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    );
  };

  return (
    <div id="notifikasi-admin" className="min-h-screen">
      <NavbarAdmin userName="Admin HR PT Jaya Skripsi" />
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

export default NotifikasiAdminPage;