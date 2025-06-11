// RegisterPage.jsx (Frontend)
import { useState } from "react";
import DaftarIMG from "../../assets/DaftarIMG.png"; // Pastikan path ini benar
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Import ikon

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk show password
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false); // State untuk show konfirmasi password
  const [role, setRole] = useState("user"); // Default role 'user'
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (password !== passwordConfirmation) {
      setErrors({
        password_confirmation: ["Konfirmasi password tidak cocok."],
      });
      setMessage("Registrasi gagal. Periksa input Anda.");
      return;
    }

    try {
      const response = await axios.post(
        "http://connect-in-backend-production-6073.up.railway.app/api/register",
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          role, // Kirim role yang dipilih
        }
      );

      if (response.status === 201) {
        setMessage(
          response.data.message || "Registrasi berhasil! Silakan login."
        );
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setRole("user"); // Reset role ke default
        setTimeout(() => {
          navigate("/masuk");
        }, 2000);
      } else {
        setMessage(
          response.data.message || "Registrasi gagal. Silakan coba lagi."
        );
      }
    } catch (err) {
      console.error("Registration error:", err.response || err.message);
      if (
        err.response &&
        err.response.status === 422 &&
        err.response.data.errors
      ) {
        setErrors(err.response.data.errors);
        setMessage(
          err.response.data.message ||
          "Registrasi gagal. Periksa kembali input Anda."
        );
      } else if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage(
          "Terjadi kesalahan saat registrasi. Silakan coba lagi nanti."
        );
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:h-screen w-screen min-h-screen absolute left-0 top-0">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </Link>
      </div>

      <div className="w-full md:w-1/3 p-8 mx-4 my-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Daftar Akun Baru
        </h2>
        {message && (
          <p
            className={`mb-4 p-3 rounded ${Object.keys(errors).length > 0 ||
              message.toLowerCase().includes("gagal") ||
              message.toLowerCase().includes("kesalahan")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
              }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-2">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Nama
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.name ? "border-red-500" : ""
                }`}
              placeholder="Nama lengkap"
              required
            />
            {errors?.name && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.name[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.email ? "border-red-500" : ""
                }`}
              placeholder="Alamat email"
              required
            />
            {errors?.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.email[0]}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.password ? "border-red-500" : ""
                  }`}
                placeholder="Minimal 8 karakter"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirmation ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.password_confirmation ? "border-red-500" : ""
                  }`}
                placeholder="Ulangi password"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswordConfirmation(!showPasswordConfirmation)
                }
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
                aria-label={showPasswordConfirmation ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
              >
                {showPasswordConfirmation ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors?.password_confirmation && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>

          {/* Pilihan Role HR */}
          <div className="mb-6">
            <label className="flex items-center text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={role === "hr"}
                onChange={(e) => setRole(e.target.checked ? "hr" : "user")}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              Daftar sebagai Perekrut (HR) - membutuhkan persetujuan Super Admin
            </label>
            {errors?.role && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.role[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/masuk" className="font-semibold text-black">
            Masuk
          </Link>
        </p>
      </div>

      <div className="hidden md:flex sm:w-2/3 md:h-screen bg-[#5285e8] justify-center items-center p-6">
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