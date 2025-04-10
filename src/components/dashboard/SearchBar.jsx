import React, { useState } from "react";

/**
 * SearchBar - Simple search component with only text search functionality
 * All filtering and sorting capabilities have been removed
 */
const SearchBar = ({ onSearchResults, allJobs }) => {
  // State for search term only
  const [searchTerm, setSearchTerm] = useState("");

  // Apply search
  const handleSearch = () => {
    if (!Array.isArray(allJobs)) {
      console.error("Jobs data is not available or not an array:", allJobs);
      return;
    }

    // Filter by search term only
    const results = allJobs.filter((job) => {
      // Search term check (case-insensitive, across multiple fields)
      return searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.postedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Update parent component with search results
    onSearchResults(results);
  };

  // Reset search and show all jobs
  const resetSearch = () => {
    setSearchTerm("");
    onSearchResults(allJobs);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Simple search input area */}
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        {/* Search input with icon */}
        <div className="flex-grow flex items-center mb-4 md:mb-0">
          <SearchIcon className="text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by: Job title, Company, Location..."
            className="w-full outline-none text-gray-700"
            aria-label="Search jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-3">
          {/* Find Job button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Find Job
          </button>

          {/* Reset button */}
          <button
            onClick={resetSearch}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * SearchIcon - Magnifying glass icon
 * @param {String} className - Additional CSS classes for styling
 */
const SearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
);

export default SearchBar;