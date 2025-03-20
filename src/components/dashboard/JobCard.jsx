import React from "react";
import { useNavigate } from "react-router-dom";
import Default from "../../assets/Anonymous.png";

/**
 * JobCard - Responsive card component for displaying job listings
 * Includes navigation to job detail page
 * @param {Object} job - Job data including title, type, salary, location, etc.
 */
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  // Handle apply button click to navigate to detail page
  const handleApplyClick = () => {
    // Navigate to job detail page using the job's ID
    navigate(`/job/${job.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md">
      {/* Job content */}
      <div className="px-4 sm:px-6 py-4">
        {/* Job title - larger font on mobile for better touch targets */}
        <h3 className="font-bold text-lg sm:text-xl text-gray-900">{job.title}</h3>
        
        {/* Job type and salary - stack on very small screens, side by side otherwise */}
        <div className="flex flex-col xs:flex-row xs:items-center mt-2 space-y-2 xs:space-y-0">
          {/* Job type badge */}
          <JobTypeBadge type={job.type} />
          
          {/* Salary - shown besides badge on larger screens */}
          <div className="flex items-center xs:ml-4 text-sm text-gray-600">
            <span>Gaji: {job.salary}</span>
          </div>
        </div>
        
        {/* Location with icon */}
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <LocationIcon className="mr-1 flex-shrink-0" />
          <span>{job.location}</span>
        </div>
      </div>

      {/* Card footer with user info and action button */}
      <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* User info section - centered on mobile, left-aligned on desktop */}
        <div className="flex items-center sm:justify-start justify-center">
          <img
            src={job.avatarUrl || Default}
            alt={job.postedBy}
            className="w-8 h-8 rounded-full mr-2 border border-gray-200"
          />
          <div>
            <p className="text-xs text-gray-500">Post By</p>
            <p className="text-sm font-medium">{job.postedBy}</p>
          </div>
        </div>
        
        {/* Apply button - full width on mobile, auto width on desktop */}
        <button 
          onClick={handleApplyClick}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          Lamar Sekarang
        </button>
      </div>
    </div>
  );
};

/**
 * JobTypeBadge - Component for displaying job type with appropriate styling
 * @param {String} type - The type of job (e.g., "FULL TIME", "PART-TIME")
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

/**
 * LocationIcon - Pin/map marker icon component
 * @param {String} className - Additional CSS classes
 */
const LocationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

export default JobCard;