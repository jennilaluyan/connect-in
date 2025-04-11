import React from "react";
import MessagesSearchBar from "./MessagesSearchBar"; // pastikan path-nya sesuai

const MessagesComponent = ({
  contacts,
  selectedContact,
  setSelectedContact,
  chats,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = React.useState("");
  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedContact, chats]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage({
        to: selectedContact,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div id="messageAdmin">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <MessagesSearchBar setSelectedContact={setSelectedContact} />
        </div>

        <div className="flex flex-col md:flex-row md:h-[70vh] bg-gray-100 gap-4">
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow-md overflow-y-auto">
            <div className="p-4">
              {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact.name || contact.id}
                    onClick={() => setSelectedContact(contact.name || contact.id)}
                    className={`flex items-start space-x-4 mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition ${selectedContact === (contact.name || contact.id)
                        ? "bg-blue-100"
                        : ""
                      }`}
                  >
                    <img
                      src={contact.image || "/api/placeholder/48/48"}
                      alt="Avatar"
                      className="rounded-full w-12 h-12 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{contact.name || contact.id}</p>
                      <p className="text-sm text-gray-500">
                        {contact.status || "Klik untuk melihat pesan"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Tidak ada kontak</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col">
            {!selectedContact ? (
              <div className="bg-white rounded-xl flex-1">
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
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>

                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSendMessage}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">{selectedContact}</h2>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto space-y-4 mb-4 p-2"
                >
                  {chats[selectedContact] && chats[selectedContact].length > 0 ? (
                    chats[selectedContact].map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`rounded-xl px-4 py-2 max-w-sm shadow-sm ${msg.from === "me"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100"
                            }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {msg.time && typeof msg.time === "string"
                              ? msg.time
                              : msg.time instanceof Date
                                ? msg.time.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                                : ""}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full text-gray-500">
                      <p>Tidak ada pesan</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <textarea
                    rows="3"
                    placeholder="Masukkan teks disini"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none bg-gray-100"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 self-end"
                    onClick={handleSendMessage}
                  >
                    Kirim
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
