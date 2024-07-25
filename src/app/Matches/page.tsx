"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JobCard from '../components/JobCard';

interface MatchComponentProps {
  match: { grade: string };
  match_id: number;
  auth_uid: string;
}

const MatchesPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
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
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const { uid } = useAuth(); // Use useAuth to get uid
  const [matchDetails, setMatchDetails] = useState<any[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [resumeDetails, setResumeDetails] = useState<any | null>(null);
  const [showStatusList, setShowStatusList] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const uniqueLocations = jobs.map(job => job.location).filter((location, index, array) => array.indexOf(location) === index);

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
        setFilteredJobs(data); // Set filteredJobs directly with fetched data
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [uid]);

  const handleButtonClick = (matchId: any) => {
    setSelectedMatchId(matchId === selectedMatchId ? null : matchId);
    setSelectedOption(null);
  };

  const handleStatusSelect = (status : any, statusCode : any) => {
    setSelectedStatus({ status, statusCode });
    setShowStatusList(false);
    setSelectedOption(status);
  };

  const handleSubmit = async () => {
    if (selectedStatus) {
      const data = {
        match_id: selectedMatchId,
        status: selectedStatus.status,
        status_code: selectedStatus.statusCode,
        auth_uid: uid
      };

      try {
        const response = await fetch(`https://resumegraderapi.onrender.com/matches/${selectedMatchId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          console.log('Status updated successfully');
          fetchMatchDetails(selectedJob.job_id);
          alert('Status updated successfully');
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const connectWebSocket = () => {
    if (!selectedJob) {
      alert('Please select a job to grade.');
      return;
    }

    const ws = new WebSocket(`https://resumegraderapi.onrender.com/grade/job/real-time/${selectedJob.job_id}?auth_uid=${uid}`);

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      updateMatchDetails(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
  };

  const updateMatchDetails = (data: string) => {
    const parsedData = JSON.parse(data);
  
    const updateDetails = (match: any) => {
      setMatchDetails(prevDetails => 
        prevDetails.map(detail => 
          detail.match_id === match.match_id 
            ? { ...detail, status: match.status, status_code: match.status_code, grade: match.grade } 
            : detail
        )
      );
    };
  
    if (Array.isArray(parsedData)) {
      parsedData.forEach(updateDetails);
    } else {
      updateDetails(parsedData);
    }
  };

  const handleMatchClick = async (matchId: string, match_uid: string) => {
    setSelectedMatchId(matchId); // Store selected match's uid
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/resumes/${match_uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume details');
      }
      const data = await response.json();
      setResumeDetails(data); // Store fetched resume details
    } catch (error) {
      console.error('Error fetching resume details:', error);
    }
  };
  
  const renderResumeDetails = () => {
    if (!resumeDetails) return null; // Do not render if no resume details are available
    return (
      <div className="mt-2">
        <h3 className="font-semibold">Resume Details:</h3>
        <p>Skills: {resumeDetails.skills.join(', ')}</p>
        <div className="mt-2">
          <h2 className="font-semibold" >Experience:</h2>
          {resumeDetails.experience.map((exp: any, index: number) => (
            <div key={index}>
              <p>Title: {exp.title}</p>
              <p>Company: {exp.company_name}</p>
              {/* Display other experience details */}
            </div>
          ))}
        </div>
        {/* Render education and other sections similarly */}
      </div>
    );
  };

  const fetchMatchDetails = async (jobId: string) => {
    try {
      console.log('fetching match details for job:' + jobId); // For testing purposes
      const response = await fetch(`https://resumegraderapi.onrender.com/matches/?job_id=${jobId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch match details');
      }
      const matchDetails = await response.json();
      console.log('Match details:', matchDetails); // For testing purposes
      // Sort match details by grade
      const sortedMatchDetails = matchDetails.sort((a: any, b: any) => {
        if (a.grade < b.grade) return 1;
        if (a.grade > b.grade) return -1;
        return 0;
      });

      setMatchDetails(sortedMatchDetails);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

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

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Match Listings</h1>
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
            <option value="CONTRACT">Contract</option>
            <option value="UNKN">Unknown</option>
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
                  <div key={index} className="mb-4" onClick={() => { setSelectedJob(job); fetchMatchDetails(job.job_id); }}>
                    <JobCard
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      job_type={getJobTypeFullName(job.job_type)}
                      description={""}
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
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedJob.title}</h2>
                <button
                  onClick={connectWebSocket}
                  className="float-right bg-blue-500 text-black rounded px-2 py-1 hover:bg-cyan-600 hover:text-white"
                >
                  Start Grading
                </button>
                {matchDetails && matchDetails.length > 0 ? (
                  <div className='mt-3'>
                    <h3 className="text-lg text-black font-bold mb-2">Match Details:</h3>
                    {matchDetails.map((match:any) => (
                      <div key={match.match_id} className={`mb-2 text-black border border-solid ${selectedMatchId === match.match_id ? 'border-2 border-blue-300 bg-blue-100' : 'border-stone-100 hover:bg-blue-200'} shadow-md rounded-md p-4`}>
                        <div onClick={() => handleMatchClick(match.match_id, match.uid)} className='cursor-pointer'>
                          <div className='float-right text-right text-blue-700 ml-2'>
                            <p><strong>{match.grade}</strong></p>
                            <button onClick={handleButtonClick}>Update Status</button>
                            {selectedMatchId === match.match_id && (
                              <div className="border border-solid border-blue-500 rounded-md my-1 ml-1 p-1">
                                <ul className='text-black text-sm'>
                                <li
                                    onClick={() => handleStatusSelect('SHORTLISTED', 701)}
                                    className={`cursor-pointer ${selectedOption === 'SHORTLISTED' ? 'font-bold text-blue-500' : ''}`}
                                  >
                                    SHORTLISTED
                                  </li>
                                  <li
                                    onClick={() => handleStatusSelect('SELECTED', 710)}
                                    className={`cursor-pointer ${selectedOption === 'SELECTED' ? 'font-bold text-blue-500' : ''}`}
                                  >
                                    SELECTED
                                  </li>
                                  <li
                                    onClick={() => handleStatusSelect('CONTACTED', 720)}
                                    className={`cursor-pointer ${selectedOption === 'CONTACTED' ? 'font-bold text-blue-500' : ''}`}
                                  >
                                    CONTACTED
                                  </li>
                                </ul>
                                <button onClick={handleSubmit} className='mt-3 p-1 hover:bg-blue-500 hover:text-white rounded-md'>Submit</button>
                              </div>
                            )}
                          </div>
                          <p><strong>Match ID:</strong> {match.match_id}</p>
                          <p><strong>Status:</strong> {match.status}</p>
                          <p><strong>Applicant:</strong> {match.user.name.first_name} {match.user.name.last_name}</p>
                        </div>
                        {selectedMatchId === match.match_id && renderResumeDetails()}
                      </div>
                    ))}
                    {/* {renderResumeDetails()} */}
                  </div>
                ) : (
                  <p>No match details found.</p>
                )}
              </div>
              ) : (
                <div className="text-center text-gray-500 w-full">Select a job to view matches.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MatchesPage;