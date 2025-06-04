// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    isAuthenticated,
    getUser as getAuthUser, // Diganti namanya agar tidak bentrok dengan state 'user'
    logout,
    isSuperAdmin,
    isApprovedHr,
    isRegularUser,
    isPendingHr,
} from "../utils/auth"; // Pastikan path ini benar
import {
    Bell,
    MessageSquare,
    ChevronDown,
    BriefcaseIcon,
    // User as UserIcon, // Bisa dihapus jika User dari lucide-react tidak digunakan sebagai ikon terpisah
    LogOut as LogOutIcon,
    // Settings, // Bisa dihapus jika tidak digunakan
    Users,
    MessageCircle,
    ChevronRight as ChevronRightIconLucide,
} from "lucide-react";
import DefaultProfilePic from "../assets/Default.jpg"; // Pastikan path ini benar

// Komponen ikon (jika masih digunakan)
const UserGroupIcon = () => <Users size={18} className="h-5 w-5" />;
const ChatIcon = () => <MessageCircle size={18} className="h-5 w-5" />;
const ChevronRight = ({ size = 16 }) => <ChevronRightIconLucide size={size} strokeWidth={2} />;

// Fungsi helper untuk membersihkan dan memvalidasi URL avatar
const getCleanAvatarUrl = (avatarUrlInput) => {
    if (!avatarUrlInput) {
        // console.log("Navbar getCleanAvatarUrl: No input URL, returning DefaultProfilePic");
        return DefaultProfilePic;
    }

    let cleanedUrl = avatarUrlInput;
    if (typeof cleanedUrl === 'string') {
        // Hapus ZWSP dan kutip, lalu trim
        cleanedUrl = cleanedUrl.replace(/\u200B/g, '').trim().replace(/^"|"$/g, '');
    } else {
        // Jika bukan string (misalnya objek File dari preview base64 yang mungkin tidak sengaja masuk)
        // console.log("Navbar getCleanAvatarUrl: Input URL is not a string, returning DefaultProfilePic", avatarUrlInput);
        return DefaultProfilePic;
    }

    if (cleanedUrl.startsWith('/storage')) {
        // Pastikan VITE_API_BASE_URL ada dan benar
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        if (baseUrl) {
            // console.log("Navbar getCleanAvatarUrl: Constructing absolute URL from relative path:", `${baseUrl}${cleanedUrl}`);
            return `${baseUrl}${cleanedUrl}`;
        } else {
            // console.warn("Navbar getCleanAvatarUrl: VITE_API_BASE_URL is not defined, cannot construct absolute URL for:", cleanedUrl);
            return DefaultProfilePic; // Fallback jika base URL tidak ada
        }
    } else if (cleanedUrl.startsWith('http')) {
        // console.log("Navbar getCleanAvatarUrl: Using absolute URL:", cleanedUrl);
        return cleanedUrl; // Sudah URL absolut
    } else if (cleanedUrl === DefaultProfilePic || cleanedUrl.startsWith('data:image')) {
        // Jika sudah DefaultProfilePic atau data URI (base64 dari preview)
        // console.log("Navbar getCleanAvatarUrl: Input is DefaultProfilePic or data URI, returning as is:", cleanedUrl);
        return cleanedUrl;
    }

    // console.log("Navbar getCleanAvatarUrl: URL format not recognized or invalid, returning DefaultProfilePic. Input was:", avatarUrlInput);
    return DefaultProfilePic; // Fallback jika format tidak dikenali
};


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [displayUser, setDisplayUser] = useState(getAuthUser()); // State untuk data pengguna di Navbar
    const [authenticated, setAuthenticated] = useState(isAuthenticated()); // State untuk status autentikasi

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState("");

    const activeColor = "#BCFC4D";
    const hoverColor = "#a8e03a";

    // Efek untuk memperbarui data pengguna dan status autentikasi di Navbar
    // ketika lokasi (navigasi) berubah atau ketika status autentikasi berubah (login/logout)
    useEffect(() => {
        console.log("Navbar useEffect [location, authenticated]: Fetching new user data. Path:", location.pathname);
        setDisplayUser(getAuthUser());
        setAuthenticated(isAuthenticated());
    }, [location, authenticated]); // Perhatikan: 'authenticated' di sini adalah state, jika ingin dari fungsi auth, perlu mekanisme lain

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-dropdown") && !event.target.closest(".profile-button")) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Efek untuk mengatur item navigasi yang aktif
    useEffect(() => {
        const currentPath = location.pathname;
        // Gunakan displayUser (dari state) untuk pengecekan role, karena lebih reaktif
        const currentUserForRoles = displayUser;

        if (currentUserForRoles && isAuthenticated()) { // Pastikan user ada dan terautentikasi
            if (currentUserForRoles.role === 'superadmin') {
                if (currentPath.includes("/superadmin/dashboard")) setActiveNavItem("SA Dashboard");
                else setActiveNavItem("");
            } else if (currentUserForRoles.role === 'hr' && currentUserForRoles.is_hr_approved_by_sa) {
                if (currentPath.includes("/hr/profile")) setActiveNavItem("HR Profile");
                else if (currentPath.includes("/hr/pesan")) setActiveNavItem("Pesan HR");
                else if (currentPath.includes("/hr/notifikasi")) setActiveNavItem("Notifikasi HR");
                else if (currentPath.includes("/hr/posting-pekerjaan")) setActiveNavItem("Posting Pekerjaan");
                else if (currentPath.includes("/hr/akun-posting-pekerjaan")) setActiveNavItem("Akun Posting Pekerjaan");
                else setActiveNavItem("");
            } else if (currentUserForRoles.role === 'user') {
                if (currentPath === "/dashboard") setActiveNavItem("Pekerjaan");
                else if (currentPath.includes("/koneksi")) setActiveNavItem("Koneksi Saya");
                else if (currentPath.includes("/pesan")) setActiveNavItem("Pesan");
                else if (currentPath.includes("/notifikasi")) setActiveNavItem("Notifikasi");
                else if (currentPath.includes("/profile")) setActiveNavItem("Profile User"); // Cocokkan dengan path profil user
                else setActiveNavItem("");
            } else {
                setActiveNavItem(""); // Untuk HR yang pending atau role tidak dikenal
            }
        } else {
            setActiveNavItem(""); // Tidak ada user atau tidak terautentikasi
        }
    }, [location.pathname, displayUser]); // Ganti dependency 'user' menjadi 'displayUser' dari state

    const handleLogout = () => {
        logout(navigate); // Ini akan menghapus user dari localStorage
        setDisplayUser(null); // Secara eksplisit set user di state Navbar menjadi null
        setAuthenticated(false); // Secara eksplisit set status autentikasi
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
        // navigate('/'); // `logout` sudah menangani navigasi
    };

    const refreshDashboard = (e) => {
        e.preventDefault();
        const targetPath = displayUser?.role === 'superadmin' ? "/superadmin/dashboard"
            : (displayUser?.role === 'hr' && displayUser?.is_hr_approved_by_sa) ? "/hr/profile"
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
        if (displayUser?.role === 'superadmin') return "/superadmin/dashboard";
        if (displayUser?.role === 'hr' && displayUser?.is_hr_approved_by_sa) return "/hr/profile";
        if (displayUser?.role === 'user') return "/profile";
        return "/"; // Fallback
    };

    const userAvatarToDisplay = getCleanAvatarUrl(displayUser?.avatar_img_url);

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
                    <div className="hidden lg:flex lg:items-center lg:space-x-2">
                        {authenticated && displayUser && (
                            <> {/* Tampilkan navigasi berdasarkan role dari displayUser */}
                                {displayUser.role === 'superadmin' && (<NavItem label="SA Dashboard" to="/superadmin/dashboard" isActive={activeNavItem === "SA Dashboard"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />)}
                                {displayUser.role === 'hr' && displayUser.is_hr_approved_by_sa && (
                                    <>
                                        <NavItem icon={<MessageSquare size={18} />} label="Pesan" to="/hr/pesan" isActive={activeNavItem === "Pesan HR"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<Bell size={18} />} label="Notifikasi" to="/hr/notifikasi" isActive={activeNavItem === "Notifikasi HR"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <Link to="/hr/posting-pekerjaan" onClick={closeAllMenus} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === "Posting Pekerjaan" ? `bg-[${activeColor}] text-black` : `text-black hover:bg-[${hoverColor}] hover:text-black`}`} style={activeNavItem === "Posting Pekerjaan" ? { backgroundColor: activeColor } : {}}>
                                            Posting Pekerjaan
                                        </Link>
                                    </>
                                )}
                                {displayUser.role === 'user' && (
                                    <>
                                        <NavItem icon={<BriefcaseIcon size={18} />} label="Pekerjaan" to="/dashboard" isActive={activeNavItem === "Pekerjaan"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<UserGroupIcon />} label="Koneksi Saya" to="/koneksi" isActive={activeNavItem === "Koneksi Saya"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<ChatIcon />} label="Pesan" to="/pesan" isActive={activeNavItem === "Pesan"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                        <NavItem icon={<Bell size={18} />} label="Notifikasi" to="/notifikasi" isActive={activeNavItem === "Notifikasi"} activeColor={activeColor} hoverColor={hoverColor} onClick={closeAllMenus} />
                                    </>
                                )}
                                {displayUser.role === 'hr' && !displayUser.is_hr_approved_by_sa && (<Link to="/pending-approval" onClick={closeAllMenus} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-yellow-600 hover:text-yellow-500`}>Status Approval</Link>)}
                            </>
                        )}
                        {!authenticated && (
                            <div className="flex items-center space-x-3">
                                <Link to="/masuk" className={`text-black hover:text-gray-700 transition-colors px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/masuk' ? `bg-[${activeColor}] text-black` : ''}`} style={location.pathname === '/masuk' ? { backgroundColor: activeColor } : {}}>Masuk</Link>
                                <Link to="/daftar" className={`font-medium px-4 py-2 rounded-md transition-colors text-sm ${location.pathname === '/daftar' ? `bg-[${activeColor}] text-black` : 'bg-blue-500 hover:bg-blue-600 text-white'}`} style={location.pathname === '/daftar' ? { backgroundColor: activeColor, color: 'black' } : {}}>Daftar</Link>
                            </div>
                        )}
                    </div>

                    {/* Profile Dropdown & Mobile Menu Button */}
                    <div className="flex items-center">
                        {authenticated && displayUser && (
                            <div className="relative hidden lg:block"> {/* Hanya tampil jika authenticated DAN displayUser ada */}
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="profile-button flex items-center focus:outline-none text-black hover:bg-gray-100 rounded-md px-2 py-1 transition-colors" >
                                    <img
                                        key={userAvatarToDisplay} // Tambahkan key untuk force re-render jika URL berubah
                                        src={userAvatarToDisplay}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full mr-2 border border-gray-300 object-cover"
                                        onError={(e) => { e.target.src = DefaultProfilePic; }} // Fallback jika src error
                                    />
                                    <span className="font-medium mr-1 text-sm truncate max-w-20">{displayUser.name?.split(" ")[0] || "User"}</span>
                                    <ChevronDown size={16} />
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="profile-dropdown absolute right-0 mt-2 w-72 bg-white text-gray-900 border border-gray-200 rounded-lg shadow-xl z-50">
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="w-16 h-16 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                                    <img
                                                        key={userAvatarToDisplay + "-dropdown"} // Key berbeda jika perlu
                                                        src={userAvatarToDisplay}
                                                        alt="User"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.src = DefaultProfilePic; }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-lg font-bold text-gray-800 truncate">{displayUser.name || "Pengguna"}</div>
                                                    <div className="text-sm text-gray-700 truncate">
                                                        {displayUser.role_name || ""} {displayUser.company_name ? `PT ${displayUser.company_name}` : ""}
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate">
                                                        {displayUser.city || ""} {displayUser.city && displayUser.province ? ", " : ""} {displayUser.province || ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={getProfileLink()} className="mt-4 block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-md text-sm" onClick={closeAllMenus}>
                                                Lihat Profil
                                            </Link>
                                        </div>
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-base font-semibold text-gray-800">Kelola</div>
                                            {displayUser.role === 'user' && (<Link to="/pekerjaan-saya" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" onClick={closeAllMenus}><span>Pekerjaan Saya</span><ChevronRight size={16} /></Link>)}
                                            {displayUser.role === 'hr' && displayUser.is_hr_approved_by_sa && (<Link to="/hr/akun-posting-pekerjaan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between" onClick={closeAllMenus}><span>Akun Posting Pekerjaan</span><ChevronRight size={16} /></Link>)}
                                        </div>
                                        <div className="py-1 border-t border-gray-200">
                                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>Keluar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* Mobile menu button */}
                        <button className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400 transition-colors ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" aria-expanded={isMenuOpen}>
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                        </button>
                        {!authenticated && !isMenuOpen && (
                            <div className="lg:hidden flex items-center space-x-2 ml-2">
                                <Link to="/masuk" className={`text-black hover:text-gray-700 transition-colors px-2 py-1 rounded text-sm ${location.pathname === '/masuk' ? `bg-[${activeColor}] text-black` : ''}`} style={location.pathname === '/masuk' ? { backgroundColor: activeColor } : {}}>Masuk</Link>
                                <Link to="/daftar" className={`font-medium px-3 py-1 rounded text-sm transition-colors ${location.pathname === '/daftar' ? `bg-[${activeColor}] text-black` : 'bg-blue-500 hover:bg-blue-600 text-white'}`} style={location.pathname === '/daftar' ? { backgroundColor: activeColor, color: 'black' } : {}}>Daftar</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {authenticated && displayUser && (
                <div className={`lg:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200 shadow-md ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {/* Mobile Nav Items disesuaikan dengan role dari displayUser */}
                        {displayUser.role === 'superadmin' && <MobileNavItem label="SA Dashboard" to="/superadmin/dashboard" isActive={activeNavItem === "SA Dashboard"} activeColor={activeColor} onClick={closeAllMenus} />}
                        {displayUser.role === 'hr' && displayUser.is_hr_approved_by_sa && (
                            <>
                                <MobileNavItem icon={<MessageSquare size={20} />} label="Pesan" to="/hr/pesan" isActive={activeNavItem === "Pesan HR"} activeColor={activeColor} onClick={closeAllMenus} />
                                <MobileNavItem icon={<Bell size={20} />} label="Notifikasi" to="/hr/notifikasi" isActive={activeNavItem === "Notifikasi HR"} activeColor={activeColor} onClick={closeAllMenus} />
                                <MobileNavItem label="Posting Pekerjaan" to="/hr/posting-pekerjaan" isActive={activeNavItem === "Posting Pekerjaan"} activeColor={activeColor} customClass={`block px-3 py-2 rounded-md text-base font-medium ${activeNavItem === "Posting Pekerjaan" ? `bg-[${activeColor}] text-black` : "text-black hover:bg-gray-100"}`} styleActive={{ backgroundColor: activeColor }} onClick={closeAllMenus} />
                            </>
                        )}
                        {displayUser.role === 'user' && (
                            <>
                                <MobileNavItem icon={<BriefcaseIcon size={20} />} label="Pekerjaan" to="/dashboard" isActive={activeNavItem === "Pekerjaan"} activeColor={activeColor} onClick={closeAllMenus} />
                                <MobileNavItem icon={<UserGroupIcon />} label="Koneksi Saya" to="/koneksi" isActive={activeNavItem === "Koneksi Saya"} activeColor={activeColor} onClick={closeAllMenus} />
                                <MobileNavItem icon={<ChatIcon />} label="Pesan" to="/pesan" isActive={activeNavItem === "Pesan"} activeColor={activeColor} onClick={closeAllMenus} />
                                <MobileNavItem icon={<Bell size={20} />} label="Notifikasi" to="/notifikasi" isActive={activeNavItem === "Notifikasi"} activeColor={activeColor} onClick={closeAllMenus} />
                            </>
                        )}
                        {displayUser.role === 'hr' && !displayUser.is_hr_approved_by_sa && <MobileNavItem label="Status Approval" to="/pending-approval" customClass="block px-3 py-2 rounded-md text-base font-medium text-yellow-600 hover:bg-gray-100" onClick={closeAllMenus} />}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover" src={userAvatarToDisplay} alt="User avatar" onError={(e) => { e.target.src = DefaultProfilePic; }} />
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                <div className="text-base font-bold text-black truncate">{displayUser.name || "Pengguna"}</div>
                                <div className="text-sm text-gray-700 truncate">
                                    {displayUser.role_name || ""} {displayUser.company_name ? `PT ${displayUser.company_name}` : ""}
                                </div>
                                <div className="text-xs text-gray-500 truncate">
                                    {displayUser.city || ""} {displayUser.city && displayUser.province ? ", " : ""} {displayUser.province || ""}
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 px-4">
                            <Link to={getProfileLink()} className="block w-full py-2 border border-blue-500 text-blue-500 rounded-full text-center font-medium hover:bg-blue-500 hover:text-white transition-colors" onClick={closeAllMenus}>
                                Lihat Profil
                            </Link>
                        </div>
                        <div className="mt-3 space-y-1">
                            <div className="block px-4 py-2 text-base font-medium text-black border-b border-gray-200">Kelola</div>
                            {displayUser.role === 'user' && (<Link to="/pekerjaan-saya" className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md mx-2" onClick={closeAllMenus}><span>Pekerjaan Saya</span><ChevronRight size={20} /></Link>)}
                            {displayUser.role === 'hr' && displayUser.is_hr_approved_by_sa && (<Link to="/hr/akun-posting-pekerjaan" className="flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md mx-2" onClick={closeAllMenus}><span>Akun Posting Pekerjaan</span><ChevronRight size={20} /></Link>)}
                            <button className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-gray-100 border-t border-gray-200 mt-2 pt-2" onClick={handleLogout}>Keluar</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Komponen NavItem dan MobileNavItem (tidak diubah, asumsikan sudah benar)
const NavItem = ({ icon, label, isActive = false, to = "/", onClick, activeColor, hoverColor }) => (
    <Link to={to} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? `bg-[${activeColor}] text-black` : `text-black hover:bg-[${hoverColor}] hover:text-black`}`} style={isActive ? { backgroundColor: activeColor } : {}} onClick={onClick}>
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        <span className="truncate">{label}</span>
    </Link>
);

const MobileNavItem = ({ icon, label, isActive = false, to, onClick, customClass, activeColor, styleActive }) => {
    if (customClass) {
        return (<Link to={to} className={customClass} onClick={onClick} style={isActive && styleActive ? styleActive : {}}>{icon && <span className="mr-3 flex-shrink-0">{icon}</span>}<span className="truncate">{label}</span></Link>);
    }
    return (<Link to={to} className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? `bg-[${activeColor}] text-black` : "text-black hover:bg-gray-100"}`} style={isActive ? { backgroundColor: activeColor } : {}} onClick={onClick}>{icon && <span className="mr-3 flex-shrink-0">{icon}</span>}<span className="truncate">{label}</span></Link>);
};


export default Navbar;