import React from "react";

// Komponen Notifikasi yang reusable
const NotifikasiComponent = ({
  filter,
  setFilter,
  notifications,
  loading,
  filterMapping,
  renderIcon
}) => {
  // Filter notifikasi berdasarkan tipe dan mapping yang diberikan
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "Semua") return true;
    return notification.type === filterMapping[filter];
  });

  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      {/* Filter Tabs - Responsively improved */}
      <div className="flex flex-wrap justify-center sm:justify-start border-b border-gray-200 mb-4 mt-12">
        <FilterTab
          label="Semua"
          isActive={filter === "Semua"}
          onClick={() => setFilter("Semua")}
        />
        {Object.keys(filterMapping).map((key) => (
          <FilterTab
            key={key}
            label={key}
            isActive={filter === key}
            onClick={() => setFilter(key)}
          />
        ))}
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
                className={`px-4 py-3 flex items-start hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {renderIcon(notification)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? 'font-semibold' : 'text-gray-900'}`}>
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
  );
};

// Filter Tab Component - Improved for responsiveness
const FilterTab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 sm:px-6 py-2 text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
};

export default NotifikasiComponent;