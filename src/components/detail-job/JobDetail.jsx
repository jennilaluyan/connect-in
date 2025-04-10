import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Default from "../../assets/Anonymous.png";
import { jobsData } from "../../data/jobsData";
import Footer from "../landing-page/Footer";
import CVUploadModal from "./CVUploadModal";

/**
 * JobDetail - Detailed job information page
 * Shows comprehensive information about a specific job posting
 * Fully responsive with appropriate spacing for different screen sizes
 */
const JobDetail = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();

  // State for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job = jobsData.find(job => job.id === parseInt(id));

  // Handle case where job is not found
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job listing you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Go Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle apply button click to open modal
  const handleApply = () => {
    setIsModalOpen(true);
  };

  // Handle CV submission
  const handleCVSubmit = (file) => {
    // Implement CV submission logic here
    console.log('CV Submitted:', file);
    alert(`CV ${file.name} submitted for ${job.title}`);
    setIsModalOpen(false);
  };

  return (
    <div id='detail-job' className="min-h-screen bg-gray-100">
      {/* Header with back button */}
      <header className="bg-white shadow-sm py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Go back"
            >
              <BackIcon />
            </button>
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Connect IN
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Job header section */}
          <div className="bg-blue-50 p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-16 w-16 bg-gray-800 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-white text-xl">
                  {job.companyName.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <p className="text-gray-600">{job.companyName}</p>
                  <div className="mt-2">
                    <JobTypeBadge type={job.type} />
                  </div>
                </div>
              </div>
              <button
                onClick={handleApply}
                className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Lamar Sekarang
              </button>
            </div>
          </div>

          {/* Job details section */}
          <div className="p-6">
            {/* Job info cards section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Location Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <LocationIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>

              {/* Salary Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <SalaryIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gaji</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
              </div>

              {/* Posted Date Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <CalendarIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Posting</p>
                  <p className="font-medium">{job.postedDate}</p>
                </div>
              </div>
            </div>

            {/* Job description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Deskripsi Pekerjaan</h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Persyaratan</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={`req-${index}`} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Tanggung Jawab</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={`resp-${index}`} className="text-gray-700">{resp}</li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Benefit</h2>
              <ul className="list-disc pl-5 space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={`benefit-${index}`} className="text-gray-700">{benefit}</li>
                ))}
              </ul>
            </div>

            {/* Posted by section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center">
                <img
                  src={job.avatarImg || Default}
                  alt={job.postedBy}
                  className="w-12 h-12 rounded-full mr-4 border border-gray-200"
                />
                <div>
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-medium">{job.postedBy}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Apply button - bottom sticky on mobile */}
          <div className="md:hidden sticky bottom-0 p-4 bg-white border-t border-gray-200 shadow-lg">
            <button
              onClick={handleApply}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Lamar Sekarang
            </button>
          </div>
        </div>
      </main>

      {/* CV Upload Modal */}
      <CVUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCVSubmit}
      />
      <Footer />
    </div>
  );
};

/**
 * JobTypeBadge - Component for displaying job type with appropriate styling
 */
const JobTypeBadge = ({ type }) => {
  // Determine badge color based on job type
  const getBadgeColor = (type) => {
    switch (type.toUpperCase()) {
      case "FULL-TIME":
        return "bg-blue-100 text-blue-800";
      case "PART-TIME":
        return "bg-purple-100 text-purple-800";
      case "INTERNSHIP":
        return "bg-indigo-100 text-indigo-800";
      case "CONTRACT":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded inline-block ${getBadgeColor(type)}`}>
      {type}
    </span>
  );
};

// Icon components
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const LocationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const SalaryIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
  </svg>
);

export default JobDetail;