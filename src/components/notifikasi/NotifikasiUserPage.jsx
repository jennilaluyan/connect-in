import React, { useState, useEffect } from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";
import NotifikasiComponent from "./NotifikasiComponents";
import Bruce from '../../assets/Bruce.jpg';
import Harry from '../../assets/Harry.jpg';
import Jay from '../../assets/Jay.jpg';
import Natasha from '../../assets/Natasha.jpg';
import Sheldon from '../../assets/Sheldon.jpg';
import Tony from '../../assets/Tony.jpg';

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
          image: Jay,
          name: "PT Tech Solutions",
          content: "Lamaran berhasil dikirim posisi UI/UX Designer",
          date: new Date(2025, 3, 10, 14, 30), // April 10, 2025, 14:30
          read: false
        },
        {
          id: 2,
          type: "connection",
          image: Bruce,
          name: "Bruce Wayne",
          content: "Bruce Wayne mengirim undangan untuk terhubung",
          date: new Date(2025, 3, 10, 10, 15), // April 10, 2025, 10:15
          read: false
        },
        {
          id: 3,
          type: "connection",
          image: Natasha,
          name: "Natasha Romanoff",
          content: "Undangan untuk terhubung dengan Natasha Romanoff diterima",
          date: new Date(2025, 3, 9, 16, 45), // April 9, 2025, 16:45
          read: false
        },
        {
          id: 4,
          type: "job",
          image: Sheldon,
          name: "Caltech Research",
          content: "Lamaran Anda untuk posisi Data Scientist sedang diproses",
          date: new Date(2025, 3, 9, 9, 20), // April 9, 2025, 9:20
          read: false
        },
        {
          id: 5,
          type: "connection",
          image: Harry,
          name: "Harry Potter",
          content: "Harry Potter melihat profil Anda",
          date: new Date(2025, 3, 8, 11, 30), // April 8, 2025, 11:30
          read: true
        },
        {
          id: 6,
          type: "connection",
          image: Tony,
          name: "Tony Stark",
          content: "Tony Stark mengomentari posting Anda tentang AI",
          date: new Date(2025, 3, 7, 13, 10), // April 7, 2025, 13:10
          read: true
        }
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
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <span className="font-bold text-xl">f</span>
        </div>
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