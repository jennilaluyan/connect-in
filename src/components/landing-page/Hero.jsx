import UNSRAT from "../../assets/UNSRAT.jpeg";

const Hero = () => {
  return (
    <section className=" mt-20 w-[600] h-[700px] flex flex-col md:flex-row items-center justify-between bg-blue-500 rounded-[50px] mt-10 p-10 gap-10 md:gap-16">
      {/* Hero Content */}
      <div className="text-center md:text-left max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[#BCFC4D]">Koneksi Alumni & Mahasiswa UNSRAT</h1>
        <p className="text-lg md:text-xl text-white mt-5 leading-relaxed">Bangun jaringan dengan sesama alumni dan mahasiswa Universitas Sam Ratulangi. Temukan koneksi baru dan peluang kerja yang sesuai untuk masa depanmu!</p>

        {/* Hero Button */}
        <button className="mt-10 px-6 py-4 w-full md:w-80 bg-[#BCFC4D] text-black font-semibold text-lg rounded-md hover:bg-[#95CF32] transition duration-300">Bergabung Sekarang</button>
      </div>

      {/* Hero Image */}
      <div className="w-[500] h-[500]">
        <img src={UNSRAT} alt="Universitas Sam Ratulangi" className="w-full h-auto rounded-lg" />
      </div>
    </section>
  );
};

export default Hero;
