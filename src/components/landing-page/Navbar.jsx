import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="logo w-auto max-w-fit text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Connect IN</div>

          {/* Menu for Desktop */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <a href="/" className="text-gray-900 hover:text-gray-600 transition">
              Beranda
            </a>
            <a href="/" className="text-gray-900 hover:text-gray-600 transition">
              Fitur
            </a>
            <a href="/" className="text-gray-900 hover:text-gray-600 transition">
              Testimoni
            </a>
          </div>

          {/* Buttons for Desktop */}
          <div className="hidden md:flex space-x-4">
            <button className="px-4 py-2 bg-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#95CF32] transition">Masuk</button>
            <button className="px-4 py-2 border-2 border-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#BCFC4D] transition">Daftar</button>
          </div>

          {/* Hamburger Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <svg className="w-8 h-8 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div>
          <a href="/" className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition">
            Beranda
          </a>
          <a href="/" className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition">
            Fitur
          </a>
          <a href="/" className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition">
            Testimoni
          </a>
          <div className="px-6 py-3 space-y-2">
            <button className="w-full py-2 bg-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#95CF32] transition">Masuk</button>
            <button className="w-full py-2 border-2 border-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#BCFC4D] transition">Daftar</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
