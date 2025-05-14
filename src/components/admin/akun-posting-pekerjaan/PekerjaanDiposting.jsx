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
    <div className="min-h-screen">
      <NavbarAdmin title="Connect IN" />

      <div className="container mx-auto px-4 py-6 mt-4 md:mt-8">
        <div id="pekerjaan-diposting" className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Full width on mobile, fixed width on larger screens */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md sticky top-20">
              {/* Item saya section */}
              <div className="p-4">
                <div className="flex items-center">
                  {/* <img src={itemIcon} alt="Item icon" className="w-5 h-5 mr-2" /> */}
                  <span className="text-gray-700 font-medium">Item saya</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Navigation Links */}
              <div className="py-2">
                <Link
                  to="#"
                  className="block py-3 px-4 text-blue-600 bg-blue-50 border-l-4 border-blue-600 font-medium"
                >
                  Pekerjaan yang diposting
                </Link>

                <Link
                  to="/admin/akun-posting-pekerjaan/pelamar"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Pelamar
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h1 className="text-xl font-semibold text-gray-800">Pekerjaan yang diposting</h1>
              </div>

              {/* Job Listings */}
              <div className="divide-y divide-gray-100">
                {jobListings.map((job, index) => (
                  <div
                    key={index}
                    className="px-4 sm:px-6 py-4"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center text-white font-bold flex-shrink-0">
                        f
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-gray-600 text-sm">{job.company}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-md">
                            {job.type}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{job.timePosted}</p>

                        <button className="text-red-500 text-sm flex items-center mt-3 hover:text-red-600 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Hapus pekerjaan ini
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination - Optional */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button className="px-2 py-1 rounded text-gray-500 hover:bg-gray-100">
                    &laquo;
                  </button>
                  <button className="px-3 py-1 rounded bg-blue-500 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded text-gray-700 hover:bg-gray-100">
                    2
                  </button>
                  <button className="px-2 py-1 rounded text-gray-500 hover:bg-gray-100">
                    &raquo;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PekerjaanDiposting;