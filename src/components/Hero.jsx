import React from "react";
import "../style.css";
import UNSRAT from "../../src/image/UNSRAT.jpeg";

const Hero = () => {
  return (
    <section className="hero">
      {/*Hero contect*/}
      <div className="hero-content">
        <h1>Koneksi Alumni & Mahasiswa UNSRAT</h1>
        <p>Bangun jaringan dengan sesama alumni dan mahasiswa Universitas Sam Ratulangi. Temukan koneksi baru dan peluang kerja yang sesuai untuk masa depanmu!</p>

        {/* hero button */}
        <button className="hero-button">Bergabung Sekarang</button>
      </div>

      {/* hero image */}
      <div className="hero-image">
        <img src={UNSRAT} alt="Universitas Sam Ratulangi" />
      </div>
    </section>
  );
};

export default Hero;
