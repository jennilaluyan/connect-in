import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import { jobsData } from "../../data/jobsData"; // Import from your data file - adjust the path as needed
import { Link } from "react-router-dom"; // Import Link for navigation

/**
 * Dashboard - Main job listing dashboard component
 * Fully responsive layout with appropriate spacing and grid adjustments
 * Now using jobsData imported from external file
 */
const Dashboard = () => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;
  
  // Calculate current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob);
  
  // Calculate total pages
  const totalPages = Math.ceil(jobsData.length / jobsPerPage);

  // Handle page changes
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job listings
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="dashboard" className="min-h-screen bg-gray-100">
      {/* Navbar component */}
      <DashboardNavbar />
      
      {/* Main content with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search section */}
        <div className="mb-6 sm:mb-8">
          <SearchBar />
        </div>
        
        {/* Job listings grid - responsive with different columns based on screen size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={{
                ...job,
                avatarUrl: job.avatarImg // Map avatarImg to avatarUrl for compatibility with existing JobCard
              }} 
            />
          ))}
        </div>
        
        {/* Show message if no jobs are found */}
        {jobsData.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">No jobs found.</p>
          </div>
        )}
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              {/* Previous page button */}
              <button
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-l-md border border-gray-300 text-sm font-medium
                  ${currentPage === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Previous
              </button>
              
              {/* Page number buttons - show up to 5 pages with ellipsis */}
              {[...Array(totalPages)].map((_, i) => {
                // Logic to show current page, adjacent pages, first and last page
                const pageNum = i + 1;
                const showPageButton = 
                  pageNum === 1 || 
                  pageNum === totalPages || 
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                
                // Don't render if we're not showing this page
                if (!showPageButton) {
                  // Show ellipsis for skipped ranges
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return (
                      <span key={`ellipsis-${pageNum}`} className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-700">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => changePage(pageNum)}
                    className={`px-3 py-1 border border-gray-300 text-sm font-medium
                      ${currentPage === pageNum 
                        ? 'bg-blue-500 text-white border-blue-500 z-10' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Next page button */}
              <button
                onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-r-md border border-gray-300 text-sm font-medium
                  ${currentPage === totalPages 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;