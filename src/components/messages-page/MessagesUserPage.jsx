import React, { useState, useEffect } from "react";
import MessagesSearchBar from "/src/components/messages-page/MessagesSearchBar.jsx";
import Footer from "../landing-page/Footer";
import MessagesComponent from "./MessagesComponents";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";
import Claire from "../../assets/Claire.jpg"
import Sherlock from "../../assets/Sherlock.jpg"

const MessagesUserPage = () => {
  const { setActiveNavItem } = useNavContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState({});
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setActiveNavItem("Pesan");

    // Fetch contacts (simulated)
    const dummyContacts = [
      {
        name: "Claire Dunphy",
        image: Claire,
        status: "Online"
      },
      {
        name: "Sherlock Holmes",
        image: Sherlock,
        status: "Terakhir dilihat 10 menit lalu"
      },
    ];
    setContacts(dummyContacts);

    // Fetch chats (simulated)
    const dummyChats = {
      "Claire Dunphy": [
        { from: "Claire Dunphy", text: "Hai! Kamu lagi sibuk nggak?", time: "09:30" },
        { from: "me", text: "Enggak kok, kenapa Claire?", time: "09:31" },
        { from: "Claire Dunphy", text: "Cuma pengen ngobrol sebentar. Kadang butuh temen cerita aja sih.", time: "09:32" },
        { from: "me", text: "Wah, boleh banget. Cerita aja, aku dengerin.", time: "09:32" }
      ],
      "Sherlock Holmes": [
        { from: "Sherlock Holmes", text: "Kau memperhatikan sesuatu yang aneh di lorong belakang kantor akhir-akhir ini?", time: "10:15" },
        { from: "me", text: "Aneh gimana, Holmes?", time: "10:16" },
        { from: "Sherlock Holmes", text: "Lampunya selalu menyala meskipun tak ada jadwal lembur. Dan ada bekas lumpur baru setiap pagi.", time: "10:17" },
        { from: "me", text: "Wah, aku gak terlalu merhatiin sih. Kamu pikir ada yang mencurigakan?", time: "10:18" },
        { from: "Sherlock Holmes", text: "Aku belum yakin. Tapi setiap detail punya arti, asal kita cukup jeli melihatnya.", time: "10:19" }
      ]
    };
    setChats(dummyChats);
  }, []);

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
            text: `Pesan otomatis dari ${to}: Terima kasih telah menghubungi!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        setChats(autoResponse);
      }, 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <MessagesComponent
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          chats={chats}
          onSendMessage={handleSendMessage}
          searchComponent={MessagesSearchBar}
        />
      </div>
    </>
  );
};

export default MessagesUserPage;