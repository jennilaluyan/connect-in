import REGISTERIMAGE from "../../assets/9f4ce124bc5a0d9f11e8f17e7006820b.png";
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:h-screen w-screen min-h-screen absolute left-0 top-0">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/3 p-8 mx-4">
        {/* Toggle for Mahasiswa/Alumni */}
        <div className="flex justify-center mb-6 space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              className="w-4 h-4 mr-2 border border-gray-400 rounded-full"
            />
            <p className="md:text-[12px] text-[11px] whitespace-nowrap">Masuk sebagai mahasiswa</p>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              className="w-4 h-4 mr-2 border border-gray-400 rounded-full"
            />
            <p className="md:text-[12px] text-[11px] whitespace-nowrap">Masuk sebagai alumni</p>
          </label>
        </div>

        {/* Input Fields */}
        <form>
          <div className="mb-4 mt-10">
            <label className="block text-gray-800 text-sm mb-2 font-bold">
              Nama
            </label>
            <input
              type="name"
              className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm mb-2 font-bold">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder=""
            />
          </div>

          {/* Register Button */}
          <button className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Daftar
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-500">
          Sudah punya akun?{" "}
          <a href="#" className="font-semibold text-black">
            <Link to="/src/components/login-page">
            Masuk
            </Link>
          </a>
        </p>
      </div>

      {/* Right Section - Illustration */}
      <div className="sm:w-2/3 md:h-screen bg-[#5285e8] flex justify-center items-center p-6">
        <div className="my-auto text-center">
          <img
            src={REGISTERIMAGE}
            alt="Illustration"
            className="w-full max-w-[70%] mx-auto"
          />
          <p className="text-white whitespace-nowrap font-bold mt-5">
            Bangun Koneksi, Buka Peluang di Connect IN
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
