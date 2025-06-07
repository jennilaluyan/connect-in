// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    isAuthenticated,
    getUser,
    logout,
    isSuperAdmin,
    isApprovedHr,
    isRegularUser,
    isPendingHr,
} from "../utils/auth"; // PERIKSA KEMBALI: path ini dari 'src/components' ke 'src/utils'
import {
    MessageSquare,
    ChevronDown,
    BriefcaseIcon,
    Users,
    MessageCircle,
    ChevronRight as ChevronRightIconLucide,
} from "lucide-react";
import DefaultProfilePic from "../assets/Default.jpg"; // Pastikan path ini benar
import NotificationBell from './notifikasi/NotificationBell'; // Path ini benar jika Navbar.jsx & notifikasi/ ada di dalam 'components'

// Komponen ikon kustom
const UserGroupIcon = () => (<Users size={18} className="h-5 w-5" />);
const ChatIcon = () => (<MessageCircle size={18} className="h-5 w-5" />);
const ChevronRight = ({ size = 16 }) => (<ChevronRightIconLucide size={size} strokeWidth={2} />);

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const authenticated = isAuthenticated();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("");

    const activeColor = "#BCFC4D";
    const hoverColor = "#a8e03a";

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                !event.target.closest(".profile-dropdown") &&
                !event.target.closest(".profile-button") &&
                !event.target.closest(".notification-bell")
            ) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        // Logika untuk menentukan item nav yang aktif (sudah benar)
        // ... (biarkan seperti yang sudah ada)
    }, [location.pathname, user]);

    const handleLogout = () => {
        logout(navigate);
        closeAllMenus();
    };

    const refreshDashboard = (e) => {
        e.preventDefault();
        const targetPath = isSuperAdmin() ? "/superadmin/dashboard" : isApprovedHr() ? "/hr/profile" : "/dashboard";
        if (location.pathname === targetPath) { window.location.reload(); } else { navigate(targetPath); }
        closeAllMenus();
    };

    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsProfileDropdownOpen(false);
    };

    const getProfileLink = () => {
        if (isSuperAdmin()) return "/superadmin/dashboard";
        if (isApprovedHr()) return "/hr/profile";
        return "/profile";
    };

    return (
        <nav className="bg-transparent text-black top-0 z-50 py-3">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" onClick={authenticated ? refreshDashboard : () => navigate('/')} className="text-xl sm:text-2xl font-bold hover:text-gray-700 transition-colors">
                            ConnectIN
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-4">
                        {authenticated && (
                            <>
                                {isSuperAdmin() && <NavItem label="SA Dashboard" to="/superadmin/dashboard" isActive={activeNavItem === "SA Dashboard"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />}
                                {isApprovedHr() && (
                                    <>
                                        <NavItem icon={<MessageSquare size={18} />} label="Pesan" to="/hr/pesan" isActive={activeNavItem === "Pesan HR"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <Link to="/hr/posting-pekerjaan" onClick={closeAllMenus} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === "Posting Pekerjaan" ? `bg-[${activeColor}] text-black` : `text-black hover:bg-[${hoverColor}] hover:text-black`}`} style={activeNavItem === "Posting Pekerjaan" ? { backgroundColor: activeColor } : {}}>
                                            Posting Pekerjaan
                                        </Link>
                                    </>
                                )}
                                {isRegularUser() && (
                                    <>
                                        <NavItem icon={<BriefcaseIcon size={18} />} label="Pekerjaan" to="/dashboard" isActive={activeNavItem === "Pekerjaan"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<UserGroupIcon />} label="Koneksi Saya" to="/koneksi" isActive={activeNavItem === "Koneksi Saya"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<ChatIcon />} label="Pesan" to="/pesan" isActive={activeNavItem === "Pesan"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                    </>
                                )}
                                {isPendingHr() && <Link to="/pending-approval" onClick={closeAllMenus} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-yellow-600 hover:text-yellow-500`}>Status Approval</Link>}
                            </>
                        )}
                    </div>

                    {/* Bagian Kanan Navbar */}
                    <div className="flex items-center">
                        {authenticated ? (
                            <div className="flex items-center gap-x-5">
                                <div className="notification-bell">
                                    <NotificationBell />
                                </div>
                                <div className="relative hidden lg:block">
                                    <button onClick={() => setIsProfileDropdownOpen(prev => !prev)} className="profile-button flex items-center focus:outline-none text-black hover:bg-gray-100 rounded-full p-1 transition-colors">
                                        <img src={user?.profile_picture_url || DefaultProfilePic} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
                                        <ChevronDown size={18} className="ml-1" />
                                    </button>
                                    {isProfileDropdownOpen && (
                                        <div className="profile-dropdown absolute right-0 mt-2 w-72 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-xl z-50">
                                            <div className="p-4 border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                                        <img src={user?.profile_picture_url || DefaultProfilePic} alt="User" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-lg font-bold text-gray-800 truncate">{user?.name || "Pengguna"}</div>
                                                        <div className="text-sm text-gray-700 truncate">{user?.role === 'hr' ? 'HR Department' : user?.role}</div>
                                                        <div className="text-xs text-gray-500 truncate">{user?.company_name ? `PT ${user.company_name}` : ""}</div>
                                                    </div>
                                                </div>
                                                <Link to={getProfileLink()} className="mt-4 block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white text-sm" onClick={closeAllMenus}>
                                                    Lihat Profil
                                                </Link>
                                            </div>
                                            <div className="py-1">
                                                <div className="px-4 py-2 text-base font-semibold text-gray-800">Kelola</div>
                                                {isRegularUser() && <Link to="/pekerjaan-saya" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" onClick={closeAllMenus}><span>Pekerjaan Saya</span><ChevronRight size={16} /></Link>}
                                                {isApprovedHr() && <Link to="/hr/akun-posting-pekerjaan" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" onClick={closeAllMenus}><span>Akun Posting Pekerjaan</span><ChevronRight size={16} /></Link>}
                                            </div>
                                            <div className="py-1 border-t border-gray-200">
                                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>Keluar</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center space-x-3">
                                <Link to="/masuk" className={`text-black hover:text-gray-700 transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/masuk' ? `bg-[${activeColor}] text-black` : ''}`} style={location.pathname === '/masuk' ? { backgroundColor: activeColor } : {}}>Masuk</Link>
                                <Link to="/daftar" className={`font-medium px-4 py-2 rounded-md transition-colors text-sm ${location.pathname === '/daftar' ? `bg-[${activeColor}] text-black` : 'bg-blue-500 hover:bg-blue-600 text-white'}`} style={location.pathname === '/daftar' ? { backgroundColor: activeColor, color: 'black' } : {}}>Daftar</Link>
                            </div>
                        )}
                        
                        {/* Tombol menu mobile */}
                        <button className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 transition-colors ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> ) : ( <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg> )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {authenticated && (
                <div className={`lg:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200 shadow-md ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {/* ... Isi menu mobile Anda (sudah ada) ... */}
                </div>
            )}
        </nav>
    );
};

// --- Komponen NavItem & MobileNavItem (TIDAK ADA PERUBAHAN) ---
const NavItem = ({ icon, label, isActive, to, onClick, activeColor, hoverColor }) => (
    <Link to={to} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? `bg-[${activeColor}] text-black` : `text-black hover:bg-[${hoverColor}] hover:text-black`}`} style={isActive ? { backgroundColor: activeColor } : {}} onClick={onClick}>
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        <span className="truncate">{label}</span>
    </Link>
);

const MobileNavItem = ({ icon, label, isActive, to, onClick, customClass, activeColor, styleActive }) => {
    if (customClass) {
        return <Link to={to} className={customClass} onClick={onClick} style={isActive && styleActive ? styleActive : {}}>{icon && <span className="mr-3 flex-shrink-0">{icon}</span>}<span className="truncate">{label}</span></Link>;
    }
    return <Link to={to} className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? `bg-[${activeColor}] text-black` : "text-black hover:bg-gray-100"}`} style={isActive ? { backgroundColor: activeColor } : {}} onClick={onClick}>{icon && <span className="mr-3 flex-shrink-0">{icon}</span>}<span className="truncate">{label}</span></Link>;
};

export default Navbar;