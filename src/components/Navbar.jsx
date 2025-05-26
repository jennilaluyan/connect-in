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
} from "../utils/auth";
import {
    Bell,
    MessageSquare,
    ChevronDown,
    BriefcaseIcon,
    User, // Untuk ikon profil jika ada
    LogOut, // Untuk ikon logout
    Settings, // Untuk Akun Posting Pekerjaan
    Users, // Ganti UserGroupIcon jika tidak didefinisikan
    MessageCircle, // Ganti ChatIcon jika tidak didefinisikan
    ChevronRight as ChevronRightIconLucide, // Menggunakan alias agar tidak bentrok
} from "lucide-react";
import DefaultProfilePic from "../assets/Anna.jpeg"; // Pastikan path ini benar

// Komponen ikon kustom (jika masih diperlukan dan tidak ada di lucide-react)
// Jika UserGroupIcon dan ChatIcon sudah ada di lucide-react (seperti Users dan MessageCircle), lebih baik gunakan dari sana.
const UserGroupIcon = () => (
    <Users size={18} className="h-5 w-5" /> // Contoh penggunaan dari lucide
);

const ChatIcon = () => (
    <MessageCircle size={18} className="h-5 w-5" /> // Contoh penggunaan dari lucide
);

const ChevronRight = ({ size = 16 }) => ( // Ukuran default disesuaikan
    <ChevronRightIconLucide size={size} strokeWidth={2} />
);


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const authenticated = isAuthenticated();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("");

    const activeColor = "#BCFC4D"; // Warna aktif dari permintaan
    const hoverColor = "#a8e03a"; // Contoh warna hover, bisa disesuaikan

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
                !event.target.closest(".profile-button")
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
            if (currentPath.includes("/hr/dashboard") || currentPath.includes("/hr/profile")) setActiveNavItem("HR Profile"); // Gabungkan profile ke dashboard HR
            else if (currentPath.includes("/hr/pesan")) setActiveNavItem("Pesan HR");
            else if (currentPath.includes("/hr/notifikasi")) setActiveNavItem("Notifikasi HR");
            else if (currentPath.includes("/hr/posting-pekerjaan")) setActiveNavItem("Posting Pekerjaan");
            else if (currentPath.includes("/hr/akun-posting-pekerjaan")) setActiveNavItem("Akun Posting Pekerjaan"); // Untuk dropdown
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
                ? "/hr/dashboard" // HR diarahkan ke dashboard/profile mereka
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
        if (isSuperAdmin()) return "/superadmin/dashboard"; // Superadmin mungkin tidak punya halaman profil khusus, atau arahkan ke dashboardnya
        if (isApprovedHr()) return "/hr/dashboard"; // Halaman profil HR yang juga dashboard
        return "/profile"; // Halaman profil user biasa
    };


    return (
        // Navbar utama: no background, text black, no shadow
        <nav className="bg-transparent text-black sticky top-0 z-50 py-3"> {/* py-3 untuk sedikit padding */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="#"
                            onClick={authenticated ? refreshDashboard : () => navigate('/')}
                            className="text-xl sm:text-2xl font-bold hover:text-gray-700 transition-colors" // Sesuaikan hover color
                        >
                            ConnectIN
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-2"> {/* Mengurangi space-x */}
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
                                        <NavItem
                                            icon={<Bell size={18} />}
                                            label="Notifikasi"
                                            to="/hr/notifikasi"
                                            isActive={activeNavItem === "Notifikasi HR"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                        <Link
                                            to="/hr/posting-pekerjaan"
                                            onClick={closeAllMenus}
                                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === "Posting Pekerjaan"
                                                    ? `bg-[${activeColor}] text-black` // text-black agar kontras dengan background aktif
                                                    : `text-black hover:bg-[${hoverColor}] hover:text-black` // text-black untuk item tidak aktif
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
                                        <NavItem
                                            icon={<Bell size={18} />}
                                            label="Notifikasi"
                                            to="/notifikasi"
                                            isActive={activeNavItem === "Notifikasi"}
                                            activeColor={activeColor}
                                            hoverColor={hoverColor}
                                            onClick={closeAllMenus}
                                        />
                                    </>
                                )}
                                {isPendingHr() && (
                                    <Link
                                        to="/pending-approval"
                                        onClick={closeAllMenus}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-yellow-600 hover:text-yellow-500`}
                                    >
                                        Status Approval
                                    </Link>
                                )}
                            </>
                        )}

                        {!authenticated && (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/masuk"
                                    className={`text-black hover:text-gray-700 transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/masuk' ? `bg-[${activeColor}] text-black` : ''}`}
                                    style={location.pathname === '/masuk' ? { backgroundColor: activeColor } : {}}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/daftar"
                                    className={`font-medium px-4 py-2 rounded-md transition-colors text-sm ${location.pathname === '/daftar' ? `bg-[${activeColor}] text-black` : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                    style={location.pathname === '/daftar' ? { backgroundColor: activeColor, color: 'black' } : {}}
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown & Mobile Menu Button */}
                    <div className="flex items-center"> {/* Hapus space-x-2 jika tidak perlu */}
                        {authenticated && (
                            <div className="relative hidden lg:block">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="profile-button flex items-center focus:outline-none text-black hover:bg-gray-100 rounded-md px-2 py-1 transition-colors"
                                >
                                    <img
                                        src={user?.profile_picture_url || DefaultProfilePic}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full mr-2 border border-gray-300"
                                    />
                                    <span className="font-medium mr-1 text-sm truncate max-w-20">
                                        {user?.name?.split(" ")[0] || "User"}
                                    </span>
                                    <ChevronDown size={16} />
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="profile-dropdown absolute right-0 mt-2 w-72 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-xl z-50">
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="w-16 h-16 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                                    <img
                                                        src={user?.profile_picture_url || DefaultProfilePic}
                                                        alt="User"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-lg font-bold text-gray-800 truncate">
                                                        {user?.name || "Pengguna"}
                                                    </div>
                                                    <div className="text-sm text-gray-700 truncate">
                                                        {user?.role_name || ""}{" "}
                                                        {user?.company_name
                                                            ? `PT ${user.company_name}`
                                                            : ""}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate">
                                                        {user?.city || ""}
                                                        {user?.city && user?.province ? ", " : ""}
                                                        {user?.province || ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to={getProfileLink()}
                                                className="mt-4 block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md text-sm"
                                                onClick={closeAllMenus}
                                            >
                                                Lihat Profil
                                            </Link>
                                        </div>

                                        <div className="py-1"> {/* Mengurangi padding */}
                                            <div className="px-4 py-2 text-base font-semibold text-gray-800">
                                                Kelola
                                            </div>
                                            {isRegularUser() && (
                                                <Link
                                                    to="/pekerjaan-saya"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                                                    onClick={closeAllMenus}
                                                >
                                                    <span>Pekerjaan Saya</span>
                                                    <ChevronRight size={16} />
                                                </Link>
                                            )}
                                            {isApprovedHr() && (
                                                <Link
                                                    to="/hr/akun-posting-pekerjaan"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                                                    onClick={closeAllMenus}
                                                >
                                                    <span>Akun Posting Pekerjaan</span>
                                                    <ChevronRight size={16} />
                                                </Link>
                                            )}
                                        </div>

                                        <div className="py-1 border-t border-gray-200"> {/* Mengurangi padding */}
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                onClick={handleLogout}
                                            >
                                                Keluar
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 transition-colors ml-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Mobile auth buttons - hanya tampil jika tidak authenticated & menu tidak terbuka (agar tidak tumpang tindih dgn menu icon) */}
                        {!authenticated && !isMenuOpen && (
                            <div className="lg:hidden flex items-center space-x-2 ml-2">
                                <Link
                                    to="/masuk"
                                    className={`text-black hover:text-gray-700 transition-colors px-2 py-1 rounded text-sm ${location.pathname === '/masuk' ? `bg-[${activeColor}] text-black` : ''}`}
                                    style={location.pathname === '/masuk' ? { backgroundColor: activeColor } : {}}
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/daftar"
                                    className={`font-medium px-3 py-1 rounded text-sm transition-colors ${location.pathname === '/daftar' ? `bg-[${activeColor}] text-black` : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                    style={location.pathname === '/daftar' ? { backgroundColor: activeColor, color: 'black' } : {}}
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {authenticated && (
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200 shadow-md ${
                        // Mobile menu dengan background putih dan shadow
                        isMenuOpen
                            ? "max-h-screen opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {isSuperAdmin() && (
                            <MobileNavItem
                                label="SA Dashboard"
                                to="/superadmin/dashboard"
                                isActive={activeNavItem === "SA Dashboard"}
                                activeColor={activeColor}
                                onClick={closeAllMenus}
                            />
                        )}
                        {isApprovedHr() && (
                            <>
                                <MobileNavItem
                                    icon={<MessageSquare size={20} />}
                                    label="Pesan"
                                    to="/hr/pesan"
                                    isActive={activeNavItem === "Pesan HR"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                                <MobileNavItem
                                    icon={<Bell size={20} />}
                                    label="Notifikasi"
                                    to="/hr/notifikasi"
                                    isActive={activeNavItem === "Notifikasi HR"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                                <MobileNavItem
                                    label="Posting Pekerjaan"
                                    to="/hr/posting-pekerjaan"
                                    isActive={activeNavItem === "Posting Pekerjaan"}
                                    activeColor={activeColor}
                                    customClass={`block px-3 py-2 rounded-md text-base font-medium ${activeNavItem === "Posting Pekerjaan"
                                            ? `bg-[${activeColor}] text-black`
                                            : "text-black hover:bg-gray-100" // Warna dasar hitam untuk mobile
                                        }`}
                                    styleActive={{ backgroundColor: activeColor }}
                                    onClick={closeAllMenus}
                                />
                            </>
                        )}
                        {isRegularUser() && (
                            <>
                                <MobileNavItem
                                    icon={<BriefcaseIcon size={20} />}
                                    label="Pekerjaan"
                                    to="/dashboard"
                                    isActive={activeNavItem === "Pekerjaan"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                                <MobileNavItem
                                    icon={<UserGroupIcon />}
                                    label="Koneksi Saya"
                                    to="/koneksi"
                                    isActive={activeNavItem === "Koneksi Saya"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                                <MobileNavItem
                                    icon={<ChatIcon />}
                                    label="Pesan"
                                    to="/pesan"
                                    isActive={activeNavItem === "Pesan"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                                <MobileNavItem
                                    icon={<Bell size={20} />}
                                    label="Notifikasi"
                                    to="/notifikasi"
                                    isActive={activeNavItem === "Notifikasi"}
                                    activeColor={activeColor}
                                    onClick={closeAllMenus}
                                />
                            </>
                        )}
                        {isPendingHr() && (
                            <MobileNavItem
                                label="Status Approval"
                                to="/pending-approval"
                                customClass="block px-3 py-2 rounded-md text-base font-medium text-yellow-600 hover:bg-gray-100"
                                onClick={closeAllMenus}
                            />
                        )}
                    </div>

                    {/* Mobile User Profile Section */}
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full border-2 border-gray-300"
                                    src={user?.profile_picture_url || DefaultProfilePic}
                                    alt="User avatar"
                                />
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="text-base font-bold text-black truncate">
                                    {user?.name || "Pengguna"}
                                </div>
                                <div className="text-sm text-gray-700 truncate">
                                    {user?.role_name || ""}{" "}
                                    {user?.company_name ? `PT ${user.company_name}` : ""}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {user?.city || ""}
                                    {user?.city && user?.province ? ", " : ""}
                                    {user?.province || ""}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 px-4">
                            <Link
                                to={getProfileLink()}
                                className="block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium hover:bg-blue-500 hover:text-white transition-colors"
                                onClick={closeAllMenus}
                            >
                                Lihat Profil
                            </Link>
                        </div>
                        <div className="mt-3 space-y-1">
                            <div className="block px-4 py-2 text-base font-medium text-black border-b border-gray-200">
                                Kelola
                            </div>
                            {isRegularUser() && (
                                <Link
                                    to="/pekerjaan-saya"
                                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md mx-2"
                                    onClick={closeAllMenus}
                                >
                                    <span>Pekerjaan Saya</span>
                                    <ChevronRight size={20} />
                                </Link>
                            )}
                            {isApprovedHr() && (
                                <Link
                                    to="/hr/akun-posting-pekerjaan"
                                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md mx-2"
                                    onClick={closeAllMenus}
                                >
                                    <span>Akun Posting Pekerjaan</span>
                                    <ChevronRight size={20} />
                                </Link>
                            )}
                            <button
                                className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100 border-t border-gray-200 mt-2 pt-2"
                                onClick={handleLogout}
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Desktop Navigation Item Component
const NavItem = ({ icon, label, isActive = false, to = "/", onClick, activeColor, hoverColor }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? `bg-[${activeColor}] text-black` // text-black agar kontras dengan background aktif
                    : `text-black hover:bg-[${hoverColor}] hover:text-black` // text-black untuk item tidak aktif
                }`}
            style={isActive ? { backgroundColor: activeColor } : {}}
            onClick={onClick}
        >
            {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
            <span className="truncate">{label}</span>
        </Link>
    );
};

// Mobile Navigation Item Component
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
                    ? `bg-[${activeColor}] text-black` // text-black agar kontras
                    : "text-black hover:bg-gray-100" // Warna dasar hitam untuk mobile
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