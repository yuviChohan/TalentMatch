"use client";

import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import ApplicationPage from '../components/ApplicationPage';

const Jobs: React.FC = () => {
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

  const jobList = [
    {
      job_id: 1,
      company: 'Starfield Industry Ltd. (The Starfield Group)',
      title: 'QA Technician',
      location: 'Calgary, Alberta',
      salary: 'From $21 an hour',
      type: 'Full-time',
      application_deadline: '2024-12-31',
      required_skills: ['quality assurance', 'inspection', 'documentation'],
      highly_preferred_skills: [''],
      rating: 4.5,
      active: true,
      description: 'Starfield Industry Ltd. (The Starfield Group) - Performs in-house calibration of inspection and monitoring equipment, such as thermometers, scales, etc. Competitive pay and benefits. Positive and fun work environment.',
      details: 'Starfield Industry Ltd. (The Starfield Group) - Wage: $21/hour. Status: Full-time, Permanent. Hours/Shifts: 40 hours per week, 5 days per week on a shiftwork basis with 2 days off per week (may not be consecutive days). Must be available to work all 3 shifts - 5am-1:30pm, 9am-5:30pm, 2:30pm-11:00pm. Performs pre-operational inspection in accordance with food safety requirements, conducts CCP verifications, incoming material inspections, and in-process product inspections and finished product quality inspections. Ensures timely and accurate documentation and records keeping is performed.'
    },
    {
      job_id: 2,
      company: 'Tech Solutions Inc.',
      title: 'Software Engineer',
      location: 'Vancouver, British Columbia',
      salary: 'From $40 an hour',
      type: 'Full-time',
      application_deadline: '2024-12-31',
      required_skills: ['JavaScript', 'Python', 'React', 'Node.js'],
      highly_preferred_skills: [''],
      rating: 4.0,
      active: true,
      description: 'Tech Solutions Inc. - Develop and maintain software applications. Competitive pay and benefits. Positive and fun work environment.',
      details: 'Tech Solutions Inc. - Wage: $40/hour. Status: Full-time, Permanent. Responsibilities: Develop and maintain software applications, collaborate with cross-functional teams, perform code reviews, and ensure high-quality code. Requirements: Bachelor\'s degree in Computer Science or related field, proficiency in JavaScript and Python, experience with React and Node.js, and excellent problem-solving skills.'
    },
    {
      job_id: 3,
      company: 'Marketing Agency X',
      title: 'Marketing Manager',
      location: 'Toronto, Ontario',
      salary: 'From $50 an hour',
      type: 'Full-time',
      application_deadline: '2024-12-31',
      required_skills: ['marketing management', 'market trends', 'sales'],
      highly_preferred_skills: [''],
      active: true,
      description: 'Marketing Agency X - Lead marketing campaigns and strategies. Competitive pay and benefits. Collaborative work environment.',
      details: 'Marketing Agency X - Wage: $50/hour. Status: Full-time, Permanent. Responsibilities: Lead and manage marketing campaigns, develop marketing strategies, analyze market trends, and collaborate with the sales team. Requirements: Bachelor\'s degree in Marketing or related field, proven experience in marketing management, strong analytical skills, and excellent communication skills.'
    },
    {
      job_id: 4,
      company: 'Creative Studio Y',
      title: 'Graphic Designer',
      location: 'Montreal, Quebec',
      salary: 'From $25 an hour',
      type: 'Part-time',
      application_deadline: '2024-12-31',
      required_skills: ['Adobe Creative Suite', 'graphic design', 'brand consistency'],
      highly_preferred_skills: [''],
      active: true,
      description: 'Creative Studio Y - Design visual content for various projects. Flexible schedule. Creative and dynamic team.',
      details: 'Creative Studio Y - Wage: $25/hour. Status: Part-time. Responsibilities: Design visual content for websites, social media, and print materials, collaborate with the creative team, and ensure brand consistency. Requirements: Bachelor\'s degree in Graphic Design or related field, proficiency in Adobe Creative Suite, strong portfolio, and excellent attention to detail.'
    },
    // Add more jobs as needed
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://resumegraderapi.onrender.com/retrieve/jobs/');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const combinedJobs = [...jobList, ...data]; // Combine manual jobs with API jobs
        setJobs(combinedJobs);
        setFilteredJobs(combinedJobs);
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
        setJobs(jobList); // Use the initial jobList as a fallback
        setFilteredJobs(jobList);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (jobType === '' || job.type === jobType)
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const sortBySalary = (order: string) => {
    const sorted = [...filteredJobs].sort((a, b) => {
      const salaryA = parseFloat(a.salary.split('$')[1]);
      const salaryB = parseFloat(b.salary.split('$')[1]);
      return order === 'lowToHigh' ? salaryA - salaryB : salaryB - salaryA;
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
            <option value="Calgary, Alberta">Calgary, Alberta</option>
            <option value="Vancouver, British Columbia">Vancouver, British Columbia</option>
            <option value="Toronto, Ontario">Toronto, Ontario</option>
            <option value="Montreal, Quebec">Montreal, Quebec</option>
            <option value="Edmonton, Alberta">Edmonton, Alberta</option>
            <option value="Ottawa, Ontario">Ottawa, Ontario</option>
            <option value="Winnipeg, Manitoba">Winnipeg, Manitoba</option>
            <option value="Quebec City, Quebec">Quebec City, Quebec</option>
            <option value="Hamilton, Ontario">Hamilton, Ontario</option>
            <option value="Halifax, Nova Scotia">Halifax, Nova Scotia</option>
          </select>
          <select
            className="border border-gray-300 rounded p-2 text-gray-700 flex-grow"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
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
                      type={job.type}
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
                    <strong>Type:</strong> {selectedJob.type ? selectedJob.type : 'N/A'}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Required Skills:</strong> {selectedJob.required_skills.join(', ')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Application Deadline:</strong> {selectedJob.application_deadline}
                  </p>
                  <p className="text-gray-700 mb-4">{selectedJob.details}</p>
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
