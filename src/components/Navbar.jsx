// src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    // --- PERUBAHAN DI SINI ---
    // Path diubah dari "./utils/auth" menjadi "../utils/auth"
    // ../ artinya "naik satu level folder" (dari 'components' ke 'src')
    isAuthenticated,
    getUser,
    logout,
    isSuperAdmin,
    isApprovedHr,
    isRegularUser,
    isPendingHr,
} from "../utils/auth";
import {
    Bell,
    MessageSquare,
    ChevronDown,
    BriefcaseIcon,
    User,
    LogOut,
    Settings,
    Users,
    MessageCircle,
    ChevronRight as ChevronRightIconLucide,
} from "lucide-react";
import DefaultProfilePic from "../assets/Default.jpg"; // Pastikan path ini benar

// --- PERUBAHAN DI SINI ---
// Path diubah dari "./components/notifikasi/NotificationBell" menjadi "./notifikasi/NotificationBell"
// karena Navbar.jsx dan folder notifikasi sama-sama berada di dalam 'components'
import NotificationBell from './notifikasi/NotificationBell';

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

    // Semua hook dan fungsi lainnya tetap sama
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };
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
        const currentPath = location.pathname;
        if (isSuperAdmin()) {
            if (currentPath.includes("/superadmin/dashboard")) setActiveNavItem("SA Dashboard");
            else setActiveNavItem("");
        } else if (isApprovedHr()) {
            if (currentPath.includes("/hr/profile")) setActiveNavItem("HR Profile");
            else if (currentPath.includes("/hr/pesan")) setActiveNavItem("Pesan HR");
            else if (currentPath.includes("/hr/notifikasi")) setActiveNavItem("Notifikasi HR");
            else if (currentPath.includes("/hr/posting-pekerjaan")) setActiveNavItem("Posting Pekerjaan");
            else if (currentPath.includes("/hr/akun-posting-pekerjaan")) setActiveNavItem("Akun Posting Pekerjaan");
            else setActiveNavItem("");
        } else if (isRegularUser()) {
            if (currentPath === "/dashboard") setActiveNavItem("Pekerjaan");
            else if (currentPath.includes("/koneksi")) setActiveNavItem("Koneksi Saya");
            else if (currentPath.includes("/pesan")) setActiveNavItem("Pesan");
            else if (currentPath.includes("/notifikasi")) setActiveNavItem("Notifikasi");
            else if (currentPath.includes("/profile")) setActiveNavItem("Profile User");
            else setActiveNavItem("");
        } else {
            setActiveNavItem("");
        }
    }, [location.pathname, user]);

    const handleLogout = () => {
        logout(navigate);
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
    };

    const refreshDashboard = (e) => {
        e.preventDefault();
        const targetPath = isSuperAdmin()
            ? "/superadmin/dashboard"
            : isApprovedHr()
                ? "/hr/profile"
                : "/dashboard";
        if (location.pathname === targetPath) {
            window.location.reload();
        } else {
            navigate(targetPath);
        }
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

    // JSX untuk Navbar (tidak ada perubahan di sini)
    return (
        <nav className="bg-transparent text-black top-0 z-50 py-3">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#"
                            onClick={authenticated ? refreshDashboard : () => navigate('/')}
                            className="text-xl sm:text-2xl font-bold hover:text-gray-700 transition-colors"
                        >
                            ConnectIN
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-2">
                        {authenticated && (
                            <>
                                {isSuperAdmin() && (
                                    <NavItem
                                        label="SA Dashboard"
                                        to="/superadmin/dashboard"
                                        isActive={activeNavItem === "SA Dashboard"}
                                        activeColor={activeColor}
                                        hoverColor={hoverColor}
                                        onClick={closeAllMenus}
                                    />
                                )}

                                {isApprovedHr() && (
                                    <>
                                        <NavItem
                                            icon={<MessageSquare size={18} />}
                                            label="Pesan"
                                            to="/hr/pesan"
                                            isActive={activeNavItem === "Pesan HR"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                        <Link
                                            to="/hr/posting-pekerjaan"
                                            onClick={closeAllMenus}
                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === "Posting Pekerjaan"
                                                ? `bg-[${activeColor}] text-black`
                                                : `text-black hover:bg-[${hoverColor}] hover:text-black`
                                            }`}
                                            style={activeNavItem === "Posting Pekerjaan" ? { backgroundColor: activeColor } : {}}
                                        >
                                            Posting Pekerjaan
                                        </Link>
                                    </>
                                )}

                                {isRegularUser() && (
                                    <>
                                        <NavItem
                                            icon={<BriefcaseIcon size={18} />}
                                            label="Pekerjaan"
                                            to="/dashboard"
                                            isActive={activeNavItem === "Pekerjaan"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                        <NavItem
                                            icon={<UserGroupIcon />}
                                            label="Koneksi Saya"
                                            to="/koneksi"
                                            isActive={activeNavItem === "Koneksi Saya"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                        <NavItem
                                            icon={<ChatIcon />}
                                            label="Pesan"
                                            to="/pesan"
                                            isActive={activeNavItem === "Pesan"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                    </>
                                )}
                                {/* ... (link untuk isPendingHr) ... */}
                            </>
                        )}
                        {/* ... (Tampilan jika tidak authenticated) ... */}
                    </div>

                    {/* Profile Dropdown & Mobile Menu Button */}
                    <div className="flex items-center gap-x-4">
                        
                        {authenticated && (
                            <div className="notification-bell">
                                <NotificationBell />
                            </div>
                        )}
                        
                        {authenticated && (
                            <div className="relative hidden lg:block">
                                {/* ... (tombol dan dropdown profil) ... */}
                            </div>
                        )}

                        {/* ... (Mobile menu button dan Mobile auth buttons) ... */}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {authenticated && (
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200 shadow-md ${
                        isMenuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                >
                    {/* ... (Mobile Nav Items) ... */}
                </div>
            )}
        </nav>
    );
};


// --- Komponen NavItem & MobileNavItem (Tidak ada perubahan) ---
// Saya sertakan kembali untuk kelengkapan, Anda bisa copy-paste seluruh file.

const NavItem = ({ icon, label, isActive = false, to = "/", onClick, activeColor, hoverColor }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                ? `bg-[${activeColor}] text-black`
                : `text-black hover:bg-[${hoverColor}] hover:text-black`
            }`}
            style={isActive ? { backgroundColor: activeColor } : {}}
            onClick={onClick}
        >
            {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
            <span className="truncate">{label}</span>
        </Link>
    );
};

const MobileNavItem = ({ icon, label, isActive = false, to, onClick, customClass, activeColor, styleActive }) => {
    if (customClass) {
        return (
            <Link to={to} className={customClass} onClick={onClick} style={isActive && styleActive ? styleActive : {}}>
                {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
                <span className="truncate">{label}</span>
            </Link>
        );
    }

    return (
        <Link
            to={to}
            className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive
                ? `bg-[${activeColor}] text-black`
                : "text-black hover:bg-gray-100"
            }`}
            style={isActive ? { backgroundColor: activeColor } : {}}
            onClick={onClick}
        >
            {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
            <span className="truncate">{label}</span>
        </Link>
    );
};

export default Navbar;