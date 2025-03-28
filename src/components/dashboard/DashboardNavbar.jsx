import React, { useState } from "react";
import { Link } from "react-router-dom";
import Default from "../../assets/Anonymous.png"

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Connect IN
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavItem icon={<BriefcaseIcon />} isActive={true} label="Pekerjaan" />
            <NavItem icon={<UserGroupIcon />} label="Koneksi Saya" />
            <NavItem icon={<ChatIcon />} label="Pesan" />
            <NavItem icon={<BellIcon />} label="Notifikasi" />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={Default}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2 border border-gray-200"
                />
                <span className="font-medium mr-1">Anna Kendrick</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center">
                    <img
                      src={Default}
                      alt="User"
                      className="w-12 h-12 rounded-full mr-3 border border-gray-200"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">Anna Kendrick</div>
                      <div className="text-sm text-gray-500">Frontend Developer</div>
                      <div className="text-sm text-gray-500">Manado, Sulawesi Utara</div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile/edit"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit Profil
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <div className="block px-4 py-2 text-sm text-gray-700">Kelola</div>
                    <Link
                      to="/job/posting"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Akun Posting Pekerjaan
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rest of the existing navbar code remains the same */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu - toggles based on state */}
        <div
          className={`${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          {/* Mobile Navigation Items */}
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavItem icon={<BriefcaseIcon />} isActive={true} label="Pekerjaan" />
            <MobileNavItem icon={<UserGroupIcon />} label="Koneksi Saya" />
            <MobileNavItem icon={<ChatIcon />} label="Pesan" />
            <MobileNavItem icon={<BellIcon />} label="Notifikasi" />
          </div>

          {/* Mobile User Profile */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 py-2">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="/path-to-avatar.jpg" alt="User avatar" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Anna Kendrick</div>
                <div className="text-sm font-medium text-gray-500">user@example.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * NavItem - Desktop navigation item component
 * @param {Object} icon - SVG icon component
 * @param {String} label - Navigation label text
 * @param {Boolean} isActive - Whether this navigation item is active
 */
const NavItem = ({ icon, label, isActive = false }) => {
  return (
    <Link
      to="#"
      className={`flex items-center px-3 py-1 rounded-md ${isActive ? 'bg-[#D5FD8C] text-black' : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

/**
 * MobileNavItem - Mobile navigation item component
 * Enhanced for touch targets and mobile display
 */
const MobileNavItem = ({ icon, label, isActive = false }) => {
  return (
    <Link
      to="#"
      className={`flex items-center px-4 py-3 ${isActive ? 'bg-[#D5FD8C] text-black' : 'text-gray-700 hover:bg-gray-100'
        }`}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-base">{label}</span>
    </Link>
  );
};

// Icon components with comments
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
);

export default DashboardNavbar;