import React from "react";
import "../style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">Connect IN</div>

      {/* Menu */}
      <div className="nav-menu">
        <a href="/">Beranda</a>
        <a href="/">Fitur</a>
        <a href="/">Testimoni</a>
      </div>

      {/* Buttons */}
      <div className="nav-buttons">
        <button className="btn btn-masuk">Masuk</button>
        <button className="btn btn-daftar">Daftar</button>
      </div>
    </nav>
  );
};

export default Navbar;
