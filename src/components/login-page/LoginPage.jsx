import LOGINIMAGE from "../../assets/035e07ebac53135fad92c0106a31f361.png";
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center md:h-screen w-screen min-h-screen absolute left-0 top-0">
            {/* Left Section - Login Form */}
            <div className="w-full md:w-1/3 p-8 my-auto">
                {/* Toggle for Mahasiswa/Alumni */}
                <div className="flex space-x-4 justify-center">
                    <input type="radio" name="role" id="mahasiswa" className="hidden peer/mahasiswa" />
                    <label htmlFor="mahasiswa" className="px-4 py-2 rounded-full text-gray-400 peer-checked/mahasiswa:text-blue-500 peer-checked/mahasiswa:bg-gray-200 cursor-pointer">
                        Mahasiswa
                    </label>

                    <input type="radio" name="role" id="alumni" className="hidden peer/alumni" />
                    <label htmlFor="alumni" className="px-4 py-2 rounded-full text-gray-400 peer-checked/alumni:text-blue-500 peer-checked/alumni:bg-gray-200 cursor-pointer">
                        Alumni
                    </label>
                </div>

                {/* Input Fields */}
                <form>
                    <div className="mb-4 mt-10">
                        <label className="block text-gray-1000 text-sm mb-2 font-bold">Email</label>
                        <input
                            type="email"
                            className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder=""
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-1000 text-sm mb-2 font-bold">Password</label>
                        <input
                            type="password"
                            className="w-full bg-blue-100 px-4 py-2 border rounded-lg border-[#5285e8] focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder=""
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-[#5285e8] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold">
                        Masuk
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-center text-gray-500">
                    Belum punya akun?{" "}
                    <a href="#" className="font-semibold text-black">
                    <Link to="/src/components/register-page">
                        Daftar
                        </Link>
                    </a>
                </p>
            </div>

            {/* Right Section - Illustration */}
            <div className=" md:flex px-3 w-full md:h-145 h-full md:mt-5 md:w-2/3 bg-[#5285e8] rounded-lg my-auto mx-5 justify-center">
                <div className="my-auto">
                    <img
                        src={LOGINIMAGE} 
                        alt="Illustration"
                        className="md:w-[70%] w-[50%] mx-auto md:p-auto p-10"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
