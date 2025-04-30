import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu open/close
  const navigate = useNavigate(); // Hook to enable navigation

  // Handler for the Masuk button
  const handleMasukClick = () => {
    navigate("/dashboard"); // Navigate to the Dashboard.jsx page
  };

  return (
    <nav className="transition-all duration-300 bg-transparent">
      <div className="navbar max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <div className="logo w-auto max-w-fit md:text-2xl lg:text-3xl font-bold text-gray-900 title-900px transition-all duration-300 hover:scale-105">
            Connect IN
          </div>

          {/* Menu for Desktop - with animations */}
          <div className="hidden md:flex md:space-x-4 md:text-lg lg:space-x-8 text-base lg:text-xl space-x-8 font-medium nav-900px">
            <a
              href="/"
              className="text-gray-900 hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#BCFC4D] after:transition-all after:duration-300 hover:after:w-full">
              Beranda
            </a>
            <a
              href="#feature-section"
              className="text-gray-900 hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#BCFC4D] after:transition-all after:duration-300 hover:after:w-full">
              Fitur
            </a>
            <a
              href="#testimonials"
              className="text-gray-900 hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#BCFC4D] after:transition-all after:duration-300 hover:after:w-full">
              Testimoni
            </a>
            <a
              href="#tim-kami"
              className="text-gray-900 hover:text-gray-600 transition-all duration-300 hover:-translate-y-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#BCFC4D] after:transition-all after:duration-300 hover:after:w-full">
              Tim Kami
            </a>
          </div>

          {/* Buttons for Desktop - with animations */}
          <div className="hidden md:flex space-x-4 md:space-x-2 lg:space-x-4">
            <Link to="/masuk">
              <button className="px-4 py-2 md:px-3 md:py-1 lg:px-4 lg:py-2 border-2 border-[#BCFC4D] bg-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#95CF32] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Masuk
              </button>
            </Link>
            <Link to="/daftar">
              <button className="px-4 py-2 md:px-3 md:py-1 lg:px-4 lg:py-2 border-2 border-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#BCFC4D] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                Daftar
              </button>
            </Link>
          </div>

          {/* Hamburger Menu Button with animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none transition-transform duration-300 hover:scale-110">
            <svg
              className="w-8 h-8 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  className="transition-all duration-300"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                  className="transition-all duration-300"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with slide down animation - FIXED HEIGHT AND PADDING */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-96 opacity-100 pb-4" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <div className="flex flex-col">
          <a
            href="/"
            className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:pl-8">
            Beranda
          </a>
          <a
            href="#features"
            className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:pl-8">
            Fitur
          </a>
          <a
            href="#testimonials"
            className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:pl-8">
            Testimoni
          </a>
          <a
            href="#tim-kami"
            className="block px-6 py-3 text-gray-900 hover:bg-gray-100 transition-all duration-300 hover:pl-8">
            Tim Kami
          </a>
          <div className="px-6 py-3 space-y-3">
            <Link to="/masuk" className="block w-full">
              <button className="w-full py-2  bg-[#BCFC4D]  text-black font-semibold rounded-md hover:bg-[#95CF32] transition-all duration-300 hover:shadow-md">
                Masuk
              </button>
            </Link>
            <Link to="/daftar" className="block w-full">
              <button className="w-full py-2 border-2 border-[#BCFC4D] text-black font-semibold rounded-md hover:bg-[#BCFC4D] transition-all duration-300 hover:shadow-md">
                Daftar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;