import React from "react";
import { Link } from "react-router-dom";
// import itemIcon from "../../assets/item-icon.png";
import NavbarAdmin from "../profile/NavbarAdmin";

const Pelamar = () => {
  // Sample applicant data - multiple Jhon Doe UI/UX Designers
  const applicants = Array(11).fill({
    id: 1,
    name: "Jhon Doe",
    position: "UI/UX DESIGNER",
  });

  return (
    <div id="pelamar">
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
              <Link to="/admin/akun-posting-pekerjaan/pekerjaan-diposting" className="block py-2 px-4 text-gray-700">
                Pekerjaan yang diposting
              </Link>
            </div>

            {/* Pelamar sidebar link */}
            <div className="py-2 px-4">
              <Link to="#" className="block py-2 px-4 text-blue-600 border-l-4 border-blue-600">
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
              <h1 className="text-xl font-semibold text-gray-800">Pelamar</h1>
            </div>

            {/* Applicant Listings */}
            <div>
              {applicants.map((applicant, index) => (
                <div key={index} className="px-6 py-4 flex justify-between items-center border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      {/* Placeholder image for applicant */}
                      <img src="/api/placeholder/48/48" alt="Applicant" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm">{applicant.position}</span>
                        <a href="#" className="text-blue-500 text-sm ml-4">
                          Download CV
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-red-100 text-red-500 text-sm rounded">Tolak Lamaran</button>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">Terima Lamaran</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pelamar;
