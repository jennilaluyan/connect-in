import React, { useState, useEffect } from "react";
import DashboardNavbar from "/src/components/dashboard/DashboardNavbar";
import Footer from "../landing-page/Footer";
import connectIMAGE from "../../assets/severus.jpg";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

const ConnectionsPage = () => {
  const { setActiveNavItem } = useNavContext();

  useEffect(() => {
    setActiveNavItem('Koneksi Saya');
  }, []);

  const invitations = [
    { name: "Harry Potter", role: "Frontend Developer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung" },
    { name: "Hermione Granger", role: "Product Manager", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung" },
    { name: "Ron Weasley", role: "Backend Developer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung" },
    { name: "Draco Malfoy", role: "UX Designer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung" },
    { name: "Luna Lovegood", role: "Creative Director", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung" }
  ];

  const connections = [
    { id: 1, name: "Harry Potter", role: "Frontend Developer", image: connectIMAGE },
    { id: 2, name: "Hermione Granger", role: "Product Manager", image: connectIMAGE },
    { id: 3, name: "Ron Weasley", role: "Backend Developer", image: connectIMAGE },
    { id: 4, name: "Draco Malfoy", role: "UX Designer", image: connectIMAGE }
  ];

  const connectionsblock = [
    { id: 1, name: "Sirius Black", role: "Data Scientist", image: connectIMAGE },
    { id: 2, name: "Albus Dumbledore", role: "AI Researcher", image: connectIMAGE },
    { id: 3, name: "Minerva McGonagall", role: "Full Stack Developer", image: connectIMAGE },
    { id: 4, name: "Lord Voldemort", role: "Cybersecurity Expert", image: connectIMAGE },
    { id: 5, name: "Rubeus Hagrid", role: "DevOps Engineer", image: connectIMAGE },
    { id: 6, name: "Neville Longbottom", role: "Software Tester", image: connectIMAGE }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const jobsPerPage = 9;

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div id="dashboard" className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Invitations */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Undangan</h2>
            {invitations.map((invite, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center border-b pb-4 mb-4 last:border-none gap-2">
                <img src={connectIMAGE} alt="Profile" className="w-10 h-10 rounded-full" />
                <div className="flex-1 text-sm">
                  <h3 className="font-bold">{invite.name}</h3>
                  <p className="text-gray-500">{invite.role}</p>
                  <p className="text-gray-400 mt-1">{invite.message}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-black px-3 py-1 rounded-lg text-xs">Abaikan</button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs">Terima</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - My Connections */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Koneksi Saya</h2>
            {connections.map((connection, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 mb-4 last:border-none gap-4">
                <img src={connectIMAGE} alt="Profile" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-bold">{connection.name}</h3>
                  <p className="text-gray-500 text-sm">{connection.role}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-xs">Pesan</button>
                  <button className="text-red-500 flex items-center space-x-1 text-xs">
                    <span>🗑️</span>
                    <span>Hapus koneksi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expand Connections Section */}
        <div className="mt-10">
          <h2 className="text-sm mb-5">Perluas koneksimu dan hubungkan sekarang</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {connectionsblock.map((connection) => (
              <div key={connection.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={connectIMAGE} alt={connection.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-md font-bold">{connection.name}</h3>
                  <p className="text-gray-500">{connection.role}</p>
                  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Hubungkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConnectionsPage;
