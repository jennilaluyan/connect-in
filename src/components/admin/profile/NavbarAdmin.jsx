import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, MessageSquare, ChevronDown, BriefcaseIcon, ChevronRight } from 'lucide-react';
import Cobie from "../../../assets/Cobie.jpeg";

const NavbarAdmin = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Use effect to update the active nav item based on the current path
    useEffect(() => {
        if (location.pathname.includes('/admin/pesan')) {
            setActiveNavItem('Pesan');
        } else if (location.pathname.includes('/admin/notifikasi')) {
            setActiveNavItem('Notifikasi');
        } else if (location.pathname.includes('/admin/posting-pekerjaan')) {
            setActiveNavItem('Posting Pekerjaan');
        } else {
            setActiveNavItem('');
        }
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
        navigate('/');
    };

    const refreshDashboard = (e) => {
        e.preventDefault();
        if (location.pathname === '/admin') {
            window.location.reload();
        } else {
            navigate('/admin');
        }
    };

    return (
        <header className="navbar bg-white shadow-sm py-3 border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="#"
                        onClick={refreshDashboard}
                        className="text-2xl font-bold text-gray-900"
                    >
                        Connect IN
                    </a>

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

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <NavItem
                            icon={<MessageSquare size={20} />}
                            isActive={activeNavItem === 'Pesan'}
                            label="Pesan"
                            to="/admin/pesan"
                        />
                        <NavItem
                            icon={<Bell size={20} />}
                            isActive={activeNavItem === 'Notifikasi'}
                            label="Notifikasi"
                            to="/admin/notifikasi"
                        />
                        <Link
                            to="/admin/posting-pekerjaan"
                            className={`px-4 py-2 rounded transition-colors ${activeNavItem === 'Posting Pekerjaan'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                        >
                            Posting Pekerjaan
                        </Link>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfileDropdown}
                                className="flex items-center focus:outline-none"
                            >
                                <img
                                    src={Cobie}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2 border border-gray-200"
                                />
                                <span className="font-medium mr-1">Cobie Smulders</span>
                                <ChevronDown size={16} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    {/* Profile section */}
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 rounded-full overflow-hidden mr-3">
                                                <img
                                                    src={Cobie}
                                                    alt="User"
                                                    className="w-full h-full object-cover border border-gray-200"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-gray-800">Cobie Smulders</div>
                                                <div className="text-sm text-gray-700">HR PT Shield</div>
                                                <div className="text-xs text-gray-500">Jakarta, DKI Jakarta</div>
                                            </div>
                                        </div>
                                        <Link
                                            to="/admin/profile"
                                            className="mt-4 block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            Lihat Profil
                                        </Link>
                                    </div>

                                    {/* Management options */}
                                    {/* <div className="py-2">
                                        <div className="px-4 py-2 text-lg font-semibold text-gray-800">Kelola</div>
                                        <Link
                                            to="/admin/akun-posting-pekerjaan"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <span className="flex-grow">Akun Posting Pekerjaan</span>
                                            <ChevronRight size={20} />
                                        </Link>
                                    </div> */}

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
                </div>

                {/* Mobile menu */}
                <div
                    className={`${isMenuOpen
                        ? 'max-h-screen opacity-100 overflow-y-auto'
                        : 'max-h-0 opacity-0 overflow-hidden'
                        } lg:hidden transition-all duration-300 ease-in-out`}
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <MobileNavItem
                            icon={<MessageSquare size={20} />}
                            isActive={activeNavItem === 'Pesan'}
                            label="Pesan"
                            to="/admin/pesan"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavItem
                            icon={<Bell size={20} />}
                            isActive={activeNavItem === 'Notifikasi'}
                            label="Notifikasi"
                            to="/admin/notifikasi"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <MobileNavItem
                            customClass={`block px-4 py-3 text-white rounded-md ${activeNavItem === 'Posting Pekerjaan'
                                ? 'bg-blue-600'
                                : 'bg-blue-500'
                                }`}
                            isActive={false}
                            label="Posting Pekerjaan"
                            to="/admin/posting-pekerjaan"
                            onClick={() => setIsMenuOpen(false)}
                        />
                    </div>

                    {/* Mobile User Profile */}
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4 py-2">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={Cobie}
                                    alt="User avatar"
                                />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-bold text-gray-800">Cobie Smulders</div>
                                <div className="text-sm text-gray-700">HR PT Shield</div>
                                <div className="text-xs text-gray-500">Manado, Sulawesi Utara</div>
                            </div>
                        </div>
                        <div className="mt-3 px-4">
                            <Link
                                to="/admin/profile"
                                className="block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Lihat Profil
                            </Link>
                        </div>
                        <div className="mt-3 space-y-1">
                            {/* <div className="block px-4 py-2 text-base font-medium text-gray-800">Kelola</div>
                            <Link
                                to="/admin/akun-posting-pekerjaan"
                                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>Akun Posting Pekerjaan</span>
                                <ChevronRight size={20} />
                            </Link> */}
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
 */
const NavItem = ({ icon, label, isActive = false, to = "/" }) => {
    return (
        <Link
            to={to}
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
 */
const MobileNavItem = ({ icon, label, isActive = false, to, onClick, customClass }) => {
    return (
        <Link
            to={to}
            className={customClass || `flex items-center px-4 py-3 ${isActive
                ? 'bg-[#D5FD8C] text-black'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            onClick={onClick}
        >
            {icon && <span className="mr-3">{icon}</span>}
            <span className="text-base">{label}</span>
        </Link>
    );
};

export default NavbarAdmin;