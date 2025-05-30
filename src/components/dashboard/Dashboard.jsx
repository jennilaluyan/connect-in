import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import { jobsData } from "../../data/jobsData";
import { useNavContext } from "/src/components/connections-page/NavContext.jsx";

/**
 * Dashboard - Main job listing dashboard component with simple search
 * Mobile responsiveness starts at 768px
 */
const Dashboard = () => {
  // Get the setActiveNavItem function from context
  const { setActiveNavItem } = useNavContext();

  useEffect(() => {
    // Automatically set the active nav item when this component mounts
    setActiveNavItem('Pekerjaan');
  }, []);

  // State for pagination and jobs
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobsPerPage = 9;

  // Load jobs data on component mount
  useEffect(() => {
    if (Array.isArray(jobsData) && jobsData.length > 0) {
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } else {
      console.error("Job data is not available or not an array:", jobsData);
      setJobs([]);
      setFilteredJobs([]);
    }
  }, []);

  // Handle search results from SearchBar
  const handleSearchResults = (results) => {
    // Make sure results is an array before updating state
    if (Array.isArray(results)) {
      setFilteredJobs(results);
      setCurrentPage(1); // Reset to first page after searching
    } else {
      console.error("Search results is not an array:", results);
    }
  };

  // Calculate current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Calculate total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Handle page changes
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of job listings
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div id="dashboard" className="min-h-screen bg-gray-100">
        {/* Main content with responsive padding - changed from sm: to md: */}
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Search section - changed from sm: to md: */}
          <div className="mb-6 md:mb-8">
            <SearchBar
              onSearchResults={handleSearchResults}
              allJobs={jobs}
            />
          </div>

          {/* Job listings grid - changed responsive breakpoints from sm/lg to md/lg */}
          {filteredJobs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

              {/* Pagination controls - always displayed if totalPages > 1 */}
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
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      const showPageButton =
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                      if (!showPageButton) {
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
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-lg">No jobs found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;