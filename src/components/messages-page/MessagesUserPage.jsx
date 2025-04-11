import React, { useState, useEffect } from "react";
import DashboardNavbar from "/src/components/dashboard/DashboardNavbar.jsx";
import MessagesSearchBar from "/src/components/messages-page/MessagesSearchBar.jsx";
import Footer from "../landing-page/Footer";
import MessagesComponent from "./MessagesComponents";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

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
        name: "Jhon Doe", 
        image: "/api/placeholder/48/48", 
        status: "Online" 
      },
      { 
        name: "Karina", 
        image: "/api/placeholder/48/48", 
        status: "Last seen 2h ago" 
      },
    ];
    setContacts(dummyContacts);
    
    // Fetch chats (simulated)
    const dummyChats = {
      "Jhon Doe": [
        { from: "Jhon Doe", text: "Halo! Ada apa?", time: "09:30" },
        { from: "me", text: "Hai Jhon!", time: "09:31" },
        { from: "me", text: "Gak ada, cuma mau sapa aja.", time: "09:31" }
      ],
      "Karina": [
        { from: "Karina", text: "Hey! Kamu sibuk?", time: "10:15" },
        { from: "me", text: "Baru aja santai, ada apa?", time: "10:20" },
        { from: "Karina", text: "Cuma mau ngobrol 😄", time: "10:21" }
      ]
    };
    setChats(dummyChats);
  }, []);

  // Handle send message
  const handleSendMessage = (message) => {
    const { to, text } = message;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
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
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        ];
        setChats(autoResponse);
      }, 1000);
    }
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      
      <MessagesComponent
        contacts={contacts}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        chats={chats}
        onSendMessage={handleSendMessage}
        searchComponent={MessagesSearchBar}
      />
      
      <Footer />
    </div>
  );
};

export default MessagesUserPage;