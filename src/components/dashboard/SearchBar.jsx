import React, { useState } from "react";
import { jobsData } from "../../data/jobsData";

/**
 * SearchBar - Responsive search component with improved filter functionality
 * Filters expand/collapse on button click and provide dynamic job filtering
 */
const SearchBar = ({ onSearchResults }) => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Toggle filters visibility
  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  // Handle search and filtering
  const handleSearch = () => {
    // Detailed filtering logic with multiple conditions
    const filteredJobs = jobsData.filter((job) => {
      // Search term check (case-insensitive, across multiple fields)
      const matchesSearch = searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.postedBy.toLowerCase().includes(searchTerm.toLowerCase());

      // Job type filter with case-insensitive comparison
      const matchesJobType = jobType === "" ||
        job.type.toLowerCase() === jobType.toLowerCase();

      // Salary range filter with more robust parsing
      const matchesSalary = salaryRange === "" ||
        (salaryRange === "0-2" && parseSalary(job.salary) <= 2000000) ||
        (salaryRange === "2-5" && parseSalary(job.salary) > 2000000 && parseSalary(job.salary) <= 5000000) ||
        (salaryRange === "5+" && parseSalary(job.salary) > 5000000);

      // Combine all filter conditions
      return matchesSearch && matchesJobType && matchesSalary;
    });

    // Update parent component with filtered results
    onSearchResults(filteredJobs);
  };

  // Helper function to parse salary string to number
  const parseSalary = (salaryString) => {
    // More robust salary parsing
    const cleanedSalary = salaryString
      .replace(/[^\d]/g, '')  // Remove non-numeric characters
      .replace(/^0+/, '');    // Remove leading zeros
    return parseInt(cleanedSalary, 10) || 0;
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setJobType("");
    setSalaryRange("");
    setFiltersExpanded(false);
    onSearchResults(jobsData); // Reset to all jobs
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Main search input area */}
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        {/* Search input with icon */}
        <div className="flex-grow flex items-center mb-4 md:mb-0">
          <SearchIcon className="text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by: Job title, Company..."
            className="w-full outline-none text-gray-700"
            aria-label="Search jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Buttons section */}
        <div className="flex items-center space-x-3">
          {/* Filter toggle button */}
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
          >
            <FilterIcon className="mr-2" />
            <span>Filters</span>
          </button>

          {/* Find Job button */}
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Find Job
          </button>
        </div>
      </div>

      {/* Expandable filter panel */}
      {filtersExpanded && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Job Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Full-Time">Full Time</option>
                <option value="Part-Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Salary Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Salary Range</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                <option value="">Any Range</option>
                <option value="0-2">0 - 2 Juta</option>
                <option value="2-5">2 - 5 Juta</option>
                <option value="5+">5+ Juta</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
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

/**
 * FilterIcon - Filter funnel icon
 * param {String} className - Additional CSS classes for styling
 */
const FilterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
  </svg>
);

export default SearchBar;