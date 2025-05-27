import React, { useState } from "react";
import { Link } from "react-router-dom";
import itemIcon from '../../assets/item-icon.png';

const PekerjaanSayaPage = () => {
    // State for active filter button
    const [activeFilter, setActiveFilter] = useState("Dilamar");

    // Sample job data
    const jobListings = [
        {
            id: 1,
            title: "Front-End Developer",
            company: "TechNova Solutions",
            type: "FULL-TIME",
            timeApplied: "Dilamar 2 hari yang lalu",
            status: "Dilamar"
        },
        {
            id: 2,
            title: "Back-End Developer",
            company: "Inova Kreasi Digital",
            type: "REMOTE",
            timeApplied: "Dilamar 1 minggu yang lalu",
            status: "Diproses"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            company: "PT. Pixel Pintar",
            type: "PART-TIME",
            timeApplied: "Dilamar kemarin",
            status: "Ditolak"
        },
        {
            id: 4,
            title: "Mobile Developer (Kotlin)",
            company: "Ruang Inovasi",
            type: "FULL-TIME",
            timeApplied: "Dilamar 3 hari yang lalu",
            status: "Wawancara"
        },
        {
            id: 5,
            title: "Project Manager",
            company: "PT. Strategi Cerdas",
            type: "REMOTE",
            timeApplied: "Dilamar 2 minggu yang lalu",
            status: "Dilamar"
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "CloudTech Asia",
            type: "FULL-TIME",
            timeApplied: "Dilamar 4 hari yang lalu",
            status: "Diproses"
        },
        {
            id: 7,
            title: "QA Tester",
            company: "BetaBit Studio",
            type: "INTERNSHIP",
            timeApplied: "Dilamar 5 hari yang lalu",
            status: "Ditolak"
        },
        {
            id: 8,
            title: "Full Stack Developer",
            company: "NextGen Lab",
            type: "PART-TIME",
            timeApplied: "Dilamar 3 hari yang lalu",
            status: "Wawancara"
        },
        {
            id: 9,
            title: "Technical Writer",
            company: "DokTech Media",
            type: "FREELANCE",
            timeApplied: "Dilamar 1 minggu yang lalu",
            status: "Dilamar"
        },
        {
            id: 10,
            title: "UI Designer",
            company: "PT. Visual Kreasi",
            type: "REMOTE",
            timeApplied: "Dilamar 6 hari yang lalu",
            status: "Diproses"
        }
    ];


    // Filter buttons
    const filters = [
        { id: "Dilamar", label: "Dilamar" },
        { id: "Diterima", label: "Diterima" },
        { id: "Ditolak", label: "Ditolak" }
    ];

    // Handle filter click
    const handleFilterClick = (filterId) => {
        setActiveFilter(filterId);
    };

    // Filter jobs based on active filter
    const filteredJobs = jobListings.filter(job => job.status === activeFilter);

    return (
        <div>
            <div className="flex flex-col md:flex-row min-h-screen p-4 mt-8" id="pekerjaan-saya">
                {/* Left Sidebar */}
                <div className="w-full md:w-64 mb-4 md:mb-0 md:mr-4">
                    <div className="bg-white rounded-lg shadow-sm">
                        {/* Item saya section */}
                        <div className="p-4">
                            <div className="flex items-center">
                                <img src={itemIcon} alt="Item icon" className="w-5 h-5 mr-2" />
                                <span className="text-gray-700 font-medium">Item saya</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200"></div>

                        {/* Pekerjaan saya sidebar link */}
                        <div className="py-2 px-4">
                            <Link
                                to="/pekerjaan-saya"
                                className="block py-2 px-4 text-blue-600 border-l-4 border-blue-600"
                            >
                                Pekerjaan saya
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4">
                            <h1 className="text-xl font-semibold text-gray-800">Pekerjaan saya</h1>
                        </div>

                        {/* Filter Buttons */}
                        <div className="px-6 pb-4 flex flex-wrap gap-2">
                            {filters.map(filter => (
                                <button
                                    key={filter.id}
                                    className={`px-6 py-2 rounded-full text-sm font-medium ${activeFilter === filter.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    onClick={() => handleFilterClick(filter.id)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        {/* Job Listings */}
                        <div>
                            {filteredJobs.map(job => (
                                <div key={job.id} className="px-6 py-4 flex items-center border-t border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 mr-4 flex items-center justify-center text-white font-bold">
                                        f
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                        <div className="flex flex-wrap items-center">
                                            <span className="text-gray-600 text-sm">{job.company}</span>
                                            <span className="ml-4 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-md">
                                                {job.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">{job.timeApplied}</p>
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

export default PekerjaanSayaPage;