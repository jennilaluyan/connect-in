import React, { useState, useEffect } from "react";
import DashboardNavbar from "/src/components/dashboard/DashboardNavbar";
import Footer from "../landing-page/Footer";
import Claire from '../../assets/Claire.jpg';
import Harry from '../../assets/Harry.jpg';
import Jay from '../../assets/Jay.jpg';
import Leonard from '../../assets/Leonard.jpg';
import Marshall from '../../assets/Marshall.jpg';
import Mitchell from '../../assets/Mitchell.jpg';
import Natasha from '../../assets/Natasha.jpg';
import Phil from '../../assets/Phil.jpg';
import Sheldon from '../../assets/Sheldon.jpg';
import Sherlock from '../../assets/Sherlock.jpg';
import Ted from '../../assets/Ted.jpg';
import Tony from '../../assets/Tony.jpg';
import Barney from '../../assets/Barney.jpg';
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

const ConnectionsPage = () => {
  const { setActiveNavItem } = useNavContext();

  useEffect(() => {
    setActiveNavItem('Koneksi Saya');
  }, []);

  const invitations = [
    { name: "Claire Dunphy", role: "Frontend Developer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung", image: Claire },
    { name: "Harry Potter", role: "Product Manager", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung", image: Harry },
    { name: "Jay Pritchett", role: "Backend Developer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung", image: Jay },
    { name: "Leonard Hofstadter", role: "UX Designer", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung", image: Leonard },
    { name: "Marshall Eriksen", role: "Creative Director", message: "Sudah mengikuti anda dan mengundang anda untuk terhubung", image: Marshall }
  ];

  const connections = [
    { id: 1, name: "Mitchell Pritchett", role: "Frontend Developer", image: Mitchell },
    { id: 2, name: "Natasha Romanoff", role: "Product Manager", image: Natasha },
    { id: 3, name: "Phil Dunphy", role: "Backend Developer", image: Phil },
    { id: 4, name: "Sheldon Cooper", role: "UX Designer", image: Sheldon }
  ];

  const connectionsblock = [
    { id: 1, name: "Sherlock Holmes", role: "Data Scientist", image: Sherlock },
    { id: 2, name: "Ted Mosby", role: "AI Researcher", image: Ted },
    { id: 3, name: "Tony Stark", role: "Full Stack Developer", image: Tony },
    { id: 5, name: "Jay Pritchett", role: "DevOps Engineer", image: Jay },
    { id: 6, name: "Leonard Hofstadter", role: "Software Tester", image: Leonard },
    { id: 6, name: "Barney Stinson", role: "Marketing Manager", image: Barney },
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
                <img src={invite.image} alt="Profile" className="w-10 h-10 rounded-full" />
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
                <img src={connection.image} alt="Profile" className="w-10 h-10 rounded-full" />
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
                <img src={connection.image} alt={connection.name} className="w-full h-40 object-cover" />
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