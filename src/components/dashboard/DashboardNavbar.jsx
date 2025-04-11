import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Default from "../../assets/Anonymous.png";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

/**
 * DashboardNavbar - Responsive navigation bar with hamburger menu for mobile views
 * Handles both desktop and mobile navigation options with smooth transitions
 */
const DashboardNavbar = () => {
  const { activeNavItem, setActiveNavItem } = useNavContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Use effect to update the active nav item based on the current path
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setActiveNavItem('Pekerjaan');
    } else if (location.pathname.includes('/connections-page')) {
      setActiveNavItem('Koneksi Saya');
    } else if (location.pathname.includes('/messages')) {
      setActiveNavItem('Pesan');
    } else if (location.pathname.includes('/notifikasi')) {
      setActiveNavItem('Notifikasi');
    }
  }, [location.pathname, setActiveNavItem]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const refreshDashboard = (e) => {
    e.preventDefault();
    if (location.pathname === '/dashboard') {
      window.location.reload();
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-3 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo yang me-refresh dashboard */}
          <a
            href="#"
            onClick={refreshDashboard}
            className="text-2xl font-bold text-gray-900"
          >
            Connect IN
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Navigation Items */}
            <NavItem
              icon={<BriefcaseIcon />}
              isActive={activeNavItem === 'Pekerjaan'}
              label="Pekerjaan"
              to="/dashboard"
            />
            <NavItem
              icon={<UserGroupIcon />}
              isActive={activeNavItem === 'Koneksi Saya'}
              label="Koneksi Saya"
              to="/src/components/connections-page"
            />
            <NavItem
              icon={<ChatIcon />}
              isActive={activeNavItem === 'Pesan'}
              label="Pesan"
              to="/messages"
            />
            <NavItem
              icon={<BellIcon />}
              isActive={activeNavItem === 'Notifikasi'}
              label="Notifikasi"
              to="/notifikasi"
            />

            {/* Profile Dropdown - Updated to match the image design */}
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

              {/* Dropdown Menu - Updated to match the image design */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {/* Profile section - Updated to use flex-row */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                        <img
                          src={Default}
                          alt="User"
                          className="w-full h-full object-cover border border-gray-200"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">Anna Kendrick</div>
                        <div className="text-sm text-gray-700">UI/UX Designer</div>
                        <div className="text-xs text-gray-500">Manado, Sulawesi Utara</div>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="mt-4 block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      Edit Profil
                    </Link>
                  </div>

                  {/* Management options */}
                  <div className="py-2">
                    <div className="px-4 py-2 text-lg font-semibold text-gray-800">Kelola</div>
                    <Link
                      to="/pekerjaan-saya"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span className="flex-grow">Pekerjaan Saya</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>

                  {/* Logout option */}
                  <div className="py-2 border-t border-gray-200">
                    <button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
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
          className={`${isMenuOpen
            ? 'max-h-screen opacity-100 overflow-y-auto'
            : 'max-h-0 opacity-0 overflow-hidden'
            } lg:hidden transition-all duration-300 ease-in-out`}
        >
          {/* Mobile Navigation Items */}
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavItem
              icon={<BriefcaseIcon />}
              isActive={activeNavItem === 'Pekerjaan'}
              label="Pekerjaan"
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavItem
              icon={<UserGroupIcon />}
              isActive={activeNavItem === 'Koneksi Saya'}
              label="Koneksi Saya"
              to="/src/components/connections-page"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavItem
              icon={<ChatIcon />}
              isActive={activeNavItem === 'Pesan'}
              label="Pesan"
              to="/messages"
              onClick={() => setIsMenuOpen(false)}
            />
            <MobileNavItem
              icon={<BellIcon />}
              isActive={activeNavItem === 'Notifikasi'}
              label="Notifikasi"
              to="/notifikasi"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>

          {/* Mobile User Profile - Updated to use flex-row as well */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 py-2">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full" src={Default} alt="User avatar" />
              </div>
              <div className="ml-3">
                <div className="text-base font-bold text-gray-800">Anna Kendrick</div>
                <div className="text-sm text-gray-700">UI/UX Designer</div>
                <div className="text-xs text-gray-500">Manado, Sulawesi Utara</div>
              </div>
            </div>
            <div className="mt-3 px-4">
              <Link
                to="/profile"
                className="block w-full py-2 border-1 border-blue-500 text-blue-500 rounded-full text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Lihat Profil
              </Link>
            </div>
            <div className="mt-3 space-y-1">
              <div className="block px-4 py-2 text-base font-medium text-gray-800">Kelola</div>
              <Link
                to="/pekerjaan-saya"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Pekerjaan Saya</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100 border-t border-gray-200 mt-2 pt-2"
                onClick={handleLogout}
              >
                Keluar
              </button>
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
 * @param {URL} to - Location
 */
const NavItem = ({ icon, label, isActive = false, to = "/", onClick }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-1 rounded-md ${isActive ? 'bg-[#D5FD8C] text-black' : 'text-gray-700 hover:bg-gray-100'
        }`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

/**
 * MobileNavItem - Mobile navigation item component
 */
const MobileNavItem = ({ icon, label, isActive = false, to, onClick }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 ${isActive
        ? 'bg-[#D5FD8C] text-black'
        : 'text-gray-700 hover:bg-gray-100'
        }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span className="text-base">{label}</span>
    </Link>
  );
};

// Icon components
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