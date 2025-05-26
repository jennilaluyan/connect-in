import React from "react";
import { Link } from "react-router-dom";

const Pelamar = () => {
  // Sample applicant data - multiple Jhon Doe UI/UX Designers
  const applicants = Array(11).fill({
    id: 1,
    name: "Jhon Doe",
    position: "UI/UX DESIGNER",
  });

  return (
    <div className="min-h-screen">
      <NavbarAdmin title="Connect IN" />

      <div className="container mx-auto px-4 py-6 mt-4 md:mt-8">
        <div id="pelamar" className="flex flex-col lg:flex-row gap-6">
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
                  to="/admin/akun-posting-pekerjaan/pekerjaan-diposting"
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Pekerjaan yang diposting
                </Link>

                <Link
                  to="#"
                  className="block py-3 px-4 text-blue-600 bg-blue-50 border-l-4 border-blue-600 font-medium"
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
                <h1 className="text-xl font-semibold text-gray-800">Pelamar</h1>
              </div>

              {/* Applicant Listings */}
              <div className="divide-y divide-gray-100">
                {applicants.map((applicant, index) => (
                  <div
                    key={index}
                    className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
                        {/* Placeholder image for applicant */}
                        <img
                          src="/api/placeholder/48/48"
                          alt="Applicant"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4">
                          <span className="text-gray-600 text-sm">{applicant.position}</span>
                          <a
                            href="#"
                            className="text-blue-500 text-sm hover:underline"
                          >
                            Download CV
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <button className="px-3 py-1.5 bg-red-100 text-red-500 text-sm rounded hover:bg-red-200 transition-colors">
                        Tolak Lamaran
                      </button>
                      <button className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                        Terima Lamaran
                      </button>
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

export default Pelamar;