import { useState } from 'react';
import { Bell, MessageSquare, ChevronDown, Menu, X } from 'lucide-react';

const NavbarAdmin = ({ userName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm py-2 px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <h1 className="text-xl md:text-2xl font-bold">Connect IN</h1>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <MessageSquare className="mr-2" size={20} />
                        <span>Pesan</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <Bell className="mr-2" size={20} />
                        <span>Notifikasi</span>
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                        Posting Pekerjaan
                    </button>
                    <div className="flex items-center ml-4">
                        <img
                            src="/api/placeholder/40/40"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 font-medium">{userName}</span>
                        <ChevronDown size={16} className="ml-1" />
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 pt-2 border-t">
                    <div className="flex flex-col space-y-3">
                        <button className="flex items-center text-gray-600 py-2">
                            <MessageSquare className="mr-2" size={20} />
                            <span>Pesan</span>
                        </button>
                        <button className="flex items-center text-gray-600 py-2">
                            <Bell className="mr-2" size={20} />
                            <span>Notifikasi</span>
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full text-center">
                            Posting Pekerjaan
                        </button>
                        <div className="flex items-center py-2">
                            <img
                                src="/api/placeholder/40/40"
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="ml-2 font-medium">{userName}</span>
                            <ChevronDown size={16} className="ml-1" />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavbarAdmin;