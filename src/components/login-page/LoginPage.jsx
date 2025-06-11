// LoginPage.jsx (Frontend)
import { useState } from "react";
import MasukIMG from "../../assets/MasukIMG.png"; // Pastikan path ini benar
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; // Import ikon

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk show password
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    try {
      const response = await axios.post("https://connect-in-backend-production.up.railway.app/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage(response.data.message || "Login berhasil!");

      const user = response.data.user;
      if (user.role === "superadmin") {
        navigate("/superadmin/dashboard");
      } else if (user.role === "hr") {
        if (user.is_hr_approved_by_sa) {
          navigate("/hr/profile");
        } else {
          navigate("/pending-approval");
        }
      } else {
        navigate("/hr/profile");
      }
    } catch (err) {
      console.error("Login error:", err.response || err.message);
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
          setMessage(
            err.response.data.message ||
            "Login gagal. Periksa kembali input Anda."
          );
        } else if (err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage(
            "Email atau password salah, atau terjadi kesalahan pada server."
          );
        }
      } else {
        setMessage("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
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

      {/* Login Form */}
      <div className="w-full md:w-1/3 p-8 my-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.email ? "border-red-500" : ""
                }`}
              required
              placeholder="Alamat email"
            />
            {errors?.email && (
              <p className="text-red-500 text-xs italic mt-1">
                {typeof errors.email === "string"
                  ? errors.email
                  : errors.email[0]}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2 font-bold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Dinamis type input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors?.password ? "border-red-500" : ""
                  }`}
                required
                placeholder="Password"
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
                {typeof errors.password === "string"
                  ? errors.password
                  : errors.password[0]}
              </p>
            )}
          </div>

          {message &&
            !errors.form && ( // Tampilkan message umum jika tidak ada error form spesifik
              <p
                className={`mb-4 p-3 rounded ${Object.keys(errors).length > 0 ||
                  message.toLowerCase().includes("gagal") ||
                  message.toLowerCase().includes("salah")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
                  }`}
              >
                {message}
              </p>
            )}
          {errors?.form && (
            <p className="text-red-500 text-sm mb-4">{errors.form[0]}</p>
          )}{" "}
          {/* Untuk error form umum */}
          <button
            type="submit"
            className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Masuk
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Belum punya akun?{" "}
          <Link to="/daftar" className="font-semibold text-black">
            Daftar
          </Link>
        </p>
      </div>

      {/* Illustration */}
      <div className="hidden md:flex sm:w-2/3 md:h-screen bg-[#5285e8] justify-center items-center p-6">
        {" "}
        {/* Menambahkan hidden md:flex */}
        <div className="my-auto text-center">
          <img
            src={MasukIMG}
            alt="Illustration"
            className="w-full max-w-[70%] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;