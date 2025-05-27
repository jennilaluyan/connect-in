import React, { useState, useEffect } from "react";
import MessagesComponent from "../../messages-page/MessagesComponents";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

const MessagesAdminPage = () => {
  const { setActiveNavItem } = useNavContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState({});
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setActiveNavItem("Pesan Admin");

    // Fetch contacts untuk admin (simulated)
    const dummyAdminContacts = [
      {
        id: "user123",
        name: "Ahmad Pelamar",
        image: "/api/placeholder/48/48",
        status: "Pelamar UI/UX Designer"
      },
      {
        id: "user456",
        name: "Budi Kandidat",
        image: "/api/placeholder/48/48",
        status: "Pelamar Frontend Developer"
      },
      {
        id: "user789",
        name: "Cindy Profesional",
        image: "/api/placeholder/48/48",
        status: "Pelamar Project Manager"
      }
    ];
    setContacts(dummyAdminContacts);

    // Fetch chats untuk admin (simulated)
    const dummyAdminChats = {
      "Ahmad Pelamar": [
        { from: "Ahmad Pelamar", text: "Selamat siang, saya tertarik dengan posisi UI/UX Designer yang dibuka", time: "13:45" },
        { from: "me", text: "Halo Ahmad, terima kasih atas ketertarikannya", time: "14:00" },
        { from: "me", text: "Bisa share portfolio Anda?", time: "14:01" }
      ],
      "Budi Kandidat": [
        { from: "Budi Kandidat", text: "Halo, apakah saya bisa tahu lebih detail mengenai posisi Frontend Developer?", time: "09:30" },
        { from: "me", text: "Tentu Budi, posisi ini membutuhkan pengalaman minimal 2 tahun dengan React dan TypeScript", time: "10:15" }
      ],
      "Cindy Profesional": [
        { from: "me", text: "Halo Cindy, kami telah review CV Anda dan tertarik untuk interview lebih lanjut", time: "15:20" },
        { from: "Cindy Profesional", text: "Terima kasih! Saya sangat antusias. Kapan bisa dilakukan interviewnya?", time: "15:30" }
      ]
    };
    setChats(dummyAdminChats);
  }, []);

  // Custom search component untuk admin
  const AdminSearchBar = ({ setSelectedContact }) => {
    const handleSearch = (e) => {
      // Implement admin-specific search logic here
      console.log("Searching:", e.target.value);
    };

    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Cari pelamar..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    );
  };

  // Handle send message
  const handleSendMessage = (message) => {
    const { to, text } = message;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Tambahkan pesan ke chat yang ada
    if (to) {
      const updatedChats = { ...chats };

      if (!updatedChats[to]) {
        updatedChats[to] = [];
      }

      updatedChats[to] = [
        ...updatedChats[to],
        {
          from: "me",
          text,
          time: timeString
        }
      ];

      setChats(updatedChats);

      // Simulasi respons otomatis (untuk demo)
      setTimeout(() => {
        const autoResponse = { ...updatedChats };
        autoResponse[to] = [
          ...autoResponse[to],
          {
            from: to,
            text: `Baik, terima kasih atas informasinya.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        setChats(autoResponse);
      }, 2000);
    }
  };

  return (
    <div id="admin-dashboard" className="min-h-screen bg-gray-100">
      <MessagesComponent
        contacts={contacts}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        chats={chats}
        onSendMessage={handleSendMessage}
        searchComponent={AdminSearchBar}
      />

    </div>
  );
};

export default MessagesAdminPage;