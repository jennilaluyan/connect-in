import React, { useState } from "react";

/**
 * SearchBar - Responsive search component
 * Adapts to different screen sizes with a collapsible filter section on mobile
 */
const SearchBar = () => {
  // State to track if filters are expanded (for mobile view)
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Main search input area */}
      <div className="p-4 flex flex-col md:flex-row md:items-center">
        {/* Search input with icon - full width on mobile */}
        <div className="flex-grow flex items-center">
          <SearchIcon className="text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by: Job title, Position, Location..."
            className="w-full outline-none text-gray-700"
            aria-label="Search jobs"
          />
        </div>
        
        {/* Buttons section - stacked on mobile, inline on desktop */}
        <div className="flex items-center mt-4 md:mt-0">
          {/* Filter toggle button - shows/hides filters on mobile */}
          <button 
            className="flex items-center px-4 py-2 mr-3 border border-gray-300 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors md:border-r md:border-gray-300 md:rounded-none"
            onClick={toggleFilters}
            aria-expanded={filtersExpanded}
            aria-controls="filter-panel"
          >
            <FilterIcon className="mr-2" />
            <span className="font-medium">Filters</span>
          </button>
          
          {/* Find Job button - consistent across breakpoints */}
          <button className="flex-grow md:flex-grow-0 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Find Job
          </button>
        </div>
      </div>
      
      {/* Expandable filter panel - shows when toggled on mobile, always visible on desktop */}
      <div 
        id="filter-panel"
        className={`
          border-t border-gray-200 
          transition-all duration-300 ease-in-out
          ${filtersExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100'} 
          overflow-hidden
        `}
      >
        {/* Filter options - laid out in a responsive grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Job Type Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          
          {/* Location Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">All Locations</option>
              <option value="lab-fatek">Lab Fatek</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          
          {/* Salary Range Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Salary Range</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Any Range</option>
              <option value="0-2">0 - 2 Juta</option>
              <option value="2-5">2 - 5 Juta</option>
              <option value="5+">5+ Juta</option>
            </select>
          </div>
          
          {/* Experience Level Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Any Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
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