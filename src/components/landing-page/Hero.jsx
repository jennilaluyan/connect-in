import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MasukIMG from "/src/assets/MasukIMG.png";

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const heroContent = document.querySelector(".hero-content");
    const heroImage = document.querySelector(".hero-image");
    const heroButton = document.querySelector(".hero-button");

    setTimeout(() => {
      heroContent?.classList.add("animate-in");
      setTimeout(() => {
        heroImage?.classList.add("animate-in");
        setTimeout(() => {
          heroButton?.classList.add("animate-in");
        }, 500);
      }, 500);
    }, 300);
  }, []);

  return (
    <section className="container my-0 mx-auto px-4 py-10 md:py-20">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#5285E8] rounded-3xl md:rounded-[50px] p-6 md:p-10 lg:p-24 gap-8 md:gap-16 overflow-hidden hero">
        <div className="text-center md:text-left w-full md:w-1/2 hero-content opacity-0 translate-y-8 transition-all duration-700">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#BCFC4D] leading-tight">Connect IN – Karier & Koneksi Profesional di Sulawesi Utara</h1>
          <p className="text-base sm:text-lg md:text-xl text-white mt-4 md:mt-5 leading-relaxed">Bergabunglah dengan ribuan profesional dan perusahaan di Sulut untuk membangun karier yang lebih baik.</p>
          <button
            onClick={() => navigate("/masuk")}
            className="hero-button mt-6 md:mt-10 px-4 sm:px-6 py-3 sm:py-4 w-full md:w-auto md:min-w-52 bg-[#BCFC4D] text-black font-semibold text-base sm:text-lg rounded-md hover:bg-[#95CF32] hover:scale-105 opacity-0 transition-all duration-500 transform">
            Bergabung Sekarang
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0 hero-image">
          <img src={MasukIMG} alt="Universitas Sam Ratulangi" className="w-full max-w-[400px] h-auto mx-auto object-contain md:object-cover" />
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>
    </section>
  );
};

export default Hero;
