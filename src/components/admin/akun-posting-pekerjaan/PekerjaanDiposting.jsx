import React from "react";
import { Link } from "react-router-dom";
// import itemIcon from "../../assets/item-icon.png";
import NavbarAdmin from "../profile/NavbarAdmin";

const PekerjaanDiposting = () => {
  // Sample job data - multiple UI/UX Designer positions from PT. Skripsi Jaya Jaya
  const jobListings = Array(11).fill({
    id: 1,
    title: "UI/UX DESIGNER",
    company: "PT. Skripsi Jaya Jaya",
    type: "PART-TIME",
    timePosted: "Diposting 1 minggu yang lalu",
  });

  return (
    <div id="pekerjaan-diposting">
      <NavbarAdmin title="Connect IN" />
      <div className="flex flex-col md:flex-row min-h-screen p-4 mt-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 mb-4 md:mb-0 md:mr-4">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Item saya section */}
            <div className="p-4">
              <div className="flex items-center">
                {/* <img src={itemIcon} alt="Item icon" className="w-5 h-5 mr-2" /> */}
                <span className="text-gray-700 font-medium">Item saya</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Pekerjaan yang diposting sidebar link */}
            <div className="py-2 px-4">
              <Link to="#" className="block py-2 px-4 text-blue-600 border-l-4 border-blue-600">
                Pekerjaan yang diposting
              </Link>
            </div>

            {/* Pelamar sidebar link */}
            <div className="py-2 px-4">
              <Link to="/admin/akun-posting-pekerjaan/pelamar" className="block py-2 px-4 text-gray-700">
                Pelamar
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">Pekerjaan yang diposting</h1>
            </div>

            {/* Job Listings */}
            <div>
              {jobListings.map((job, index) => (
                <div key={index} className="px-6 py-4 flex justify-between items-center border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center text-white font-bold">f</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap items-center">
                        <span className="text-gray-600 text-sm">{job.company}</span>
                        <span className="ml-4 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-md">{job.type}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{job.timePosted}</p>
                    </div>
                  </div>
                  <button className="text-red-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus pekerjaan ini
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PekerjaanDiposting;
