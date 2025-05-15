import { useState } from "react";
import MasukIMG from "../../assets/MasukIMG.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      // Simpan token dan user data (opsional)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Cek role
      const userRole = response.data.user.role;

      if (userRole === "admin") {
        navigate("/admin/profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:h-screen w-screen min-h-screen absolute left-0 top-0">
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </Link>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/3 p-8 my-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-10">
            <label className="block text-gray-1000 text-sm mb-2 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Alamat email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-1000 text-sm mb-2 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              placeholder="Password"
            />
          </div>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
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
      <div className="sm:w-2/3 md:h-screen bg-[#5285e8] flex justify-center items-center p-6">
        <div className="my-auto text-center">
          <img src={MasukIMG} alt="Illustration" className="w-full max-w-[70%] mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
