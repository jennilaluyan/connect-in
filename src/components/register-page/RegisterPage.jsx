import DaftarIMG from "../../assets/DaftarIMG.png";
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/profile'); // Navigate to dashboard page on form submission
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:h-screen w-screen min-h-screen absolute left-0 top-0">
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </Link>
      </div>

      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/3 p-8 mx-4">

        {/* Input Fields */}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Daftar
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/masuk" className="font-semibold text-black">
            Masuk
          </Link>
        </p>
      </div>

      {/* Right Section - Illustration */}
      <div className="sm:w-2/3 md:h-screen bg-[#5285e8] flex justify-center items-center p-6">
        <div className="my-auto text-center">
          <img
            src={DaftarIMG}
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