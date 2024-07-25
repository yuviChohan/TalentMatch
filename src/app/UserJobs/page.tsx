import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import JobCard from '../components/JobCard';
import ApplicationPage from '../components/ApplicationPage';
import SavedJobsPage from '../components/SavedJobsPage';
import { useAuth } from '../contexts/AuthContext';

const Jobs: React.FC<{}> = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('lowToHigh');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [viewingSavedJobs, setViewingSavedJobs] = useState<boolean>(false);
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const { uid } = useAuth();

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
        setJobs(data);
        setFilteredJobs(data);

        if (uid) {
          const appliedResponse = await fetch(`https://resumegraderapi.onrender.com/matches/?uid=${uid}`);
          if (!appliedResponse.ok) {
            throw new Error('Failed to fetch applied jobs');
          }
          const appliedData = await appliedResponse.json();
          setAppliedJobs(appliedData);

          const userResponse = await fetch(`https://resumegraderapi.onrender.com/users/${uid}`);
          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await userResponse.json();
          const savedJobIds = userData.saved_jobs;
          const savedJobsList = data.filter((job: any) => savedJobIds.includes(job.job_id));
          setSavedJobs(savedJobsList);
        }
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [uid]);

  const handleSearch = () => {
    const filtered = jobs.filter(job => (
      job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(location.toLowerCase()) &&
      (jobType === '' || job.type === jobType)
    ));
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const sortBySalary = (order: string) => {
    const sorted = [...filteredJobs].sort((a, b) => (
      order === 'lowToHigh' ? a.salary - b.salary : b.salary - a.salary
    ));
    setFilteredJobs(sorted);
    setSortOrder(order);
  };

  const handleApply = async (job: any) => {
    if (!uid) {
      window.alert('Please log in to apply for jobs.');
      return;
    }
    setApplyingJob(job);

    // Original functionality to handle applying job
    try {
      const response = await fetch('https://resumegraderapi.onrender.com/matches/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: uid,
          job_id: job.job_id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to apply for job');
      }

      setAppliedJobs([...appliedJobs, job]);
      window.alert(`You have applied for the job: ${job.title}`);
    } catch (error) {
      window.alert('Error applying for job. Please try again later.');
    }
  };

  const handleSaveJob = async (job: any) => {
    if (!uid) {
      window.alert('Please log in to save jobs.');
      return;
    }

    if (!savedJobs.some(savedJob => savedJob.job_id === job.job_id)) {
      try {
        const response = await fetch('https://resumegraderapi.onrender.com/users/saved_jobs', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uid: uid,
            job_id: job.job_id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save job');
        }

        setSavedJobs([...savedJobs, job]);
        window.alert(`You have saved the job: ${job.title}`);
      } catch (error) {
        window.alert('Error saving job. Please try again later.');
      }
    }
  };

  const handleDeleteJob = (jobId: string) => {
    const updatedSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(updatedSavedJobs);
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

  const getJobTypeFullName = (type: string) => {
    switch (type) {
      case 'FULL':
        return 'Full-time';
      case 'PART':
        return 'Part-time';
      case 'CONT':
        return 'Contract';
      case 'UNKN':
        return 'Unknown';
      default:
        return 'Unknown';
    }
  };

  const isJobApplied = (jobId: string) => {
    return appliedJobs.some(job => job.job_id === jobId);
  };

  if (applyingJob) {
    return <ApplicationPage job={applyingJob} goBack={handleGoBack} navigateToProfile={() => {}} />;
  }

  if (viewingSavedJobs) {
    return (
      <SavedJobsPage 
        savedJobs={savedJobs} 
        setViewingSavedJobs={setViewingSavedJobs} 
        handleApply={handleApply} 
        handleDeleteJob={handleDeleteJob} 
        setSavedJobs={setSavedJobs} 
      />
    );
  }

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h1>
        <button
          onClick={() => setViewingSavedJobs(true)}
          className="bg-yellow-500 text-white rounded px-4 py-2 mb-4"
        >
          View Saved Jobs
        </button>
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
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="FULL">Full-time</option>
            <option value="PART">Part-time</option>
            <option value="CONT">Contract</option>
            <option value="UNKN">Unknown</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded px-4 py-2 mx-2"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white rounded px-4 py-2"
          >
            Clear Filters
          </button>
          <select
            className="border border-gray-300 rounded p-2 text-gray-700 flex-grow ml-2"
            value={sortOrder}
            onChange={(e) => sortBySalary(e.target.value)}
          >
            <option value="lowToHigh">Sort by Salary: Low to High</option>
            <option value="highToLow">Sort by Salary: High to Low</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-xl font-semibold text-gray-700">Loading jobs...</div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center w-full">{error}</div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <div className="w-2/5 p-4">
              {filteredJobs.length > 0 ? (
                currentJobs.map((job, index) => (
                  <div key={index} className="mb-4" onClick={() => setSelectedJob(job)}>
                    <JobCard
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      job_type={getJobTypeFullName(job.job_type)}
                      description={`${job.description.substring(0, 100)}...`}
                    />
                    {isJobApplied(job.job_id) ? (
                      <button
                        disabled
                        className="bg-gray-400 text-white rounded px-4 py-2 mt-2 mr-2"
                      >
                        Already Applied
                      </button>
                    ) : (
                      uid ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(job);
                          }}
                          className="bg-blue-500 text-white rounded px-4 py-2 mt-2 mr-2"
                        >
                          Apply
                        </button>
                      ) : (
                        <Link href="/SignIn" passHref legacyBehavior>
                          <a className="bg-blue-500 text-white rounded px-4 py-2 mt-2 mr-2">Apply</a>
                        </Link>
                      )
                    )}
                    {uid ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveJob(job);
                        }}
                        className="bg-yellow-500 text-white rounded px-4 py-2 mt-2"
                      >
                        Save Job
                      </button>
                    ) : (
                      <Link href="/SignIn" passHref legacyBehavior>
                        <a className="bg-yellow-500 text-white rounded px-4 py-2 mt-2">Save Job</a>
                      </Link>
                    )}
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
                    <strong>Type:</strong> {getJobTypeFullName(selectedJob.job_type)}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Required Skills:</strong> {selectedJob.required_skills.join(', ')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Description:</strong> {selectedJob.description}
                  </p>
                  {isJobApplied(selectedJob.job_id) ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white rounded px-4 py-2 mt-2 mr-2"
                    >
                      Already Applied
                    </button>
                  ) : (
                    uid ? (
                      <button
                        onClick={() => handleApply(selectedJob)}
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-2 mr-2"
                      >
                        Apply
                      </button>
                    ) : (
                      <Link href="/SignIn" passHref legacyBehavior>
                        <a className="bg-blue-500 text-white rounded px-4 py-2 mt-2 mr-2">Apply</a>
                      </Link>
                    )
                  )}
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-gray-500 text-white rounded px-4 py-2 mt-2 ml-2"
                  >
                    Back to Listings
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 w-full">Select a job to view details.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
    );
    };
    
    export default Jobs;