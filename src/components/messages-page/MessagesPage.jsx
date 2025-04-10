import React, { useState, useEffect } from "react";
import DashboardNavbar from "/src/components/dashboard/DashboardNavbar.jsx";
import MessagesSearchBar from "/src/components/messages-page/MessagesSearchBar.jsx";
import Footer from "../landing-page/Footer";
import connectIMAGE from "../../assets/severus.jpg";

import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

const dummyChats = {
  "Jhon Doe": [
    { from: "me", text: "Hai Jhon!" },
    { from: "Jhon Doe", text: "Halo! Ada apa?" },
    { from: "me", text: "Gak ada, cuma mau sapa aja." }
  ],
  "Karina": [
    { from: "Karina", text: "Hey! Kamu sibuk?" },
    { from: "me", text: "Baru aja santai, ada apa?" },
    { from: "Karina", text: "Cuma mau ngobrol 😄" }
  ]
};

const contacts = [
  { name: "Jhon Doe", image: connectIMAGE },
  { name: "Karina", image: connectIMAGE },
];

const MessagesPage = () => {
  const { setActiveNavItem } = useNavContext();
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    setActiveNavItem('Pesan');
  }, []);

  return (
    <div id="dashboard" className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <MessagesSearchBar setSelectedContact={setSelectedContact} />
        </div>

        {/* Responsive layout */}
        <div className="flex flex-col md:flex-row md:h-[70vh] bg-gray-100 gap-4">
          {/* Sidebar: Contacts */}
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow-md overflow-y-auto">
            <div className="p-4">
              {contacts.map((contact) => (
                <div
                  key={contact.name}
                  onClick={() => setSelectedContact(contact.name)}
                  className={`flex items-start space-x-4 mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition ${selectedContact === contact.name ? "bg-blue-100" : ""
                    }`}
                >
                  <img
                    src={contact.image}
                    alt="Avatar"
                    className="rounded-full w-12 h-12"
                  />
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-gray-500">
                      Klik untuk melihat pesan
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col">
            {!selectedContact ? (
              <div className="bg-white rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Buat Pesan Baru</h2>

                <input
                  type="text"
                  placeholder="Ketik nama"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <textarea
                  rows="8"
                  placeholder="Masukkan teks disini"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-100"
                ></textarea>

                <div className="flex justify-end">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                    Kirim
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">{selectedContact}</h2>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {dummyChats[selectedContact]?.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.from === "me" ? "justify-start" : "justify-end"
                        }`}
                    >
                      <div className="bg-blue-100 rounded-xl px-4 py-2 max-w-sm shadow-md">
                        <p className="text-sm text-gray-800">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <textarea
                  rows="4"
                  placeholder="Masukkan teks disini"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-100"
                />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 self-end">
                  Kirim
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MessagesPage;
