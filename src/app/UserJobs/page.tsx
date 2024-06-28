"use client";

import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import ApplicationPage from '../components/ApplicationPage';

const Jobs: React.FC<{}> = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [job_type, setJobType] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('lowToHigh');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://resumegraderapi.onrender.com/jobs/');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const combinedJobs = [ ...data]; // Combine manual jobs with API jobs
        setJobs(combinedJobs);
        setFilteredJobs(combinedJobs);
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatDate = (dateObject: { day: number, month: number, year: number }) => {
    const { day, month, year } = dateObject;
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
  };

  const handleSearch = () => {
    const filtered = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (job_type === '' || job.type === job_type)
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

 const sortBySalary = (order: string) => {
  const sorted = [...filteredJobs].sort((a, b) => {
    return order === 'lowToHigh' ? a.salary - b.salary : b.salary - a.salary;
  });
  setFilteredJobs(sorted);
  setSortOrder(order);
};


  const handleApply = (job: any) => {
    setApplyingJob(job);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setJobTitle('');
    setLocation('');
    setJobType('');
    setFilteredJobs(jobs);
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleGoBack = () => {
    setApplyingJob(null);
  };

  if (applyingJob) {
    return <ApplicationPage job={applyingJob} goBack={handleGoBack} navigateToProfile={function (): void {
      throw new Error('Function not implemented.');
    } } />;
  }

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h1>

        <div className="flex flex-wrap justify-between items-center mb-6 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Job Title"
            className="border border-gray-300 rounded p-2 text-gray-700 flex-grow"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <select
      className="border border-gray-300 rounded p-2 text-gray-700 flex-grow mx-2"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
          >
        <option value="">Select Location</option>
      {uniqueLocations.map((loc, index) => (
        <option key={index} value={loc}>{loc}</option>
      ))}
    </select>
          <select
            className="border border-gray-300 rounded p-2 text-gray-700 flex-grow"
            value={job_type}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="FULL">Full-time</option>
            <option value="PART">Part-time</option>
            <option value="CONTRACT">Contract</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
          >
            Clear
          </button>
          <select
            onChange={(e) => sortBySalary(e.target.value)}
            className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
          >
            <option value="lowToHigh">Sort by Salary: Low to High</option>
            <option value="highToLow">Sort by Salary: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex">
            <div className="w-2/5 p-4">
              {currentJobs.length > 0 ? (
                currentJobs.map((job, index) => (
                  <div key={index} className="mb-4" onClick={() => setSelectedJob(job)}>
                    <JobCard
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      job_type={job.job_type}
                      description={`${job.description.substring(0, 100)}...`}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 w-full">No job listings found.</div>
              )}
              <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-3/5 p-4">
              {selectedJob ? (
                <div className="bg-white p-6 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{selectedJob.title}</h2>
                  <p className="text-gray-700 mb-2">
                    <strong>Company:</strong> {selectedJob.company}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Location:</strong> {selectedJob.location}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Salary:</strong> {selectedJob.salary}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Type:</strong> {selectedJob.job_type ? selectedJob.job_type : 'N/A'}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Required Skills:</strong> {selectedJob.required_skills.join(', ')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Application Deadline:</strong> {formatDate(selectedJob.application_deadline)}
                  </p>
                  <p className="text-gray-700 mb-4"> {selectedJob.details ? selectedJob.details : selectedJob.description}</p>
                  <button
                    onClick={() => handleApply(selectedJob)}
                    className="bg-blue-500 text-white rounded px-4 py-2"
                  >
                    Apply Now
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500">Select a job to view details.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Jobs;