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

  // Render icon Facebook-style
  const renderIcon = () => {
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
        <span className="font-bold text-xl">f</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <NavbarAdmin userName="Admin HR PT Jaya Skripsi" />
      <div id="notifikasiAdmin">
        <NotifikasiComponent
          filter={filter}
          setFilter={setFilter}
          notifications={notifications}
          loading={loading}
          filterMapping={filterMapping}
          renderIcon={renderIcon}
        />
      </div>
    </div>
  );
};

export default NotifikasiAdminPage;