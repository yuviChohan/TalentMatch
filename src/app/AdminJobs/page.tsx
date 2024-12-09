"use client";

import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const jobTypeMapping: Record<string, string> = {
  FULL: 'Full-Time',
  PART: 'Part-Time',
  CONT: 'Contract',
  UNKN: 'Unknown',
};

const AdminJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [jobsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);
  const { uid } = useAuth();

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
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatDate = (dateObject: { day: number, month: number, year: number } | null) => {
    if (!dateObject) {
      return '1970-01-01'; // Default date in case dateObject is null or undefined
    }
    const { day, month, year } = dateObject;
    return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const handleSearch = () => {
    const filtered = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const handleJobClick = async (job: any) => {
    setSelectedJob(job);
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/matches?job_id=${job.job_id}`);
      const data = await response.json();
      // if (Array.isArray(data)) {
      //   const applicantDetails = await Promise.all(
      //     data.map(async (applicant: any) => {
      //       const userResponse = await fetch(`https://resumegraderapi.onrender.com/users/${applicant.uid}`);
      //       const userData = await userResponse.json();
      //       return { ...applicant, user: userData };
      //     })
      //   );
      //   setApplicants(applicantDetails);
      // } else {
      //   console.error('Expected an array but got:', data);
      //   setApplicants([]);
      // }
    } catch (error) {
      console.error('Error fetching applicants:', error);
      // setApplicants([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (jobId: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await fetch(`https://resumegraderapi.onrender.com/jobs/${jobId}`, {
          method: 'DELETE',
        });
        setJobs(jobs.filter(job => job.job_id !== jobId));
        setFilteredJobs(filteredJobs.filter(job => job.job_id !== jobId));
        setSelectedJob(null); // Reset selected job
        alert('Job deleted successfully');
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job');
      }
    }
  };

  const handleEdit = (job: any) => {
    setIsEditing(true);
    setEditJob(job);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure the application_deadline is a valid date string and not in the past
    const application_deadline = new Date(editJob.application_deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare dates only
    if (application_deadline < today) {
      alert('The application deadline cannot be in the past.');
      return;
    }

    const deadlineParts = editJob.application_deadline.split('-');
    const formattedDeadline = `${deadlineParts[2]}${deadlineParts[1]}${deadlineParts[0]}`;

    const updatedJob = {
      job_id: editJob.job_id,
      auth_uid: uid,
      title: editJob.title,
      company: editJob.company,
      description: editJob.description,
      required_skills: editJob.required_skills,
      application_deadline: formattedDeadline,
      location: editJob.location,
      salary: parseFloat(editJob.salary),
      job_type: editJob.job_type,
      active: editJob.active
    };

    console.log('Updated Job:', updatedJob);

    try {
      const response = await fetch('https://resumegraderapi.onrender.com/jobs/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJob)
      });

      if (response.ok) {
        const updatedJobResponse = await response.json();
        setJobs(jobs.map(job => (job.job_id === editJob.job_id ? updatedJobResponse : job)));
        setFilteredJobs(filteredJobs.map(job => (job.job_id === editJob.job_id ? updatedJobResponse : job)));
        setIsEditing(false);
        setSelectedJob(updatedJobResponse); // Update the selected job details
        alert('Job updated successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to update job:', errorResponse); // Debugging line
        alert(`Failed to update job: ${JSON.stringify(errorResponse)}`); // Log detailed error message
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setEditJob({ ...editJob, [name]: checked !== undefined ? checked : value });
  };

  if (isEditing) {
    return (
      <main className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 min-h-screen">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Job</h1>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Company</label>
              <input
                type="text"
                name="company"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.company}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.description}
                onChange={handleEditChange}
                required
                rows={5}
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Required Skills (comma separated)</label>
              <input
                type="text"
                name="required_skills"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.required_skills.join(', ')}
                onChange={(e) =>
                  setEditJob({ ...editJob, required_skills: e.target.value.split(',').map(skill => skill.trim()) })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Application Deadline</label>
              <input
                type="date"
                name="application_deadline"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.application_deadline}
                onChange={handleEditChange}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.location}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Salary</label>
              <input
                type="number"
                name="salary"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.salary}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Job Type</label>
              <select
                name="job_type"
                className="border border-gray-300 rounded p-3 w-full text-gray-800"
                value={editJob.job_type}
                onChange={handleEditChange}
              >
                <option value="FULL">Full-Time</option>
                <option value="PART">Part-Time</option>
                <option value="CONT">Contract</option>
                <option value="UNKN">Unknown</option>
              </select>
            </div>
            <div className="mb-6 flex items-center">
              <label className="block text-gray-700 font-semibold mr-4">Active</label>
              <input
                type="checkbox"
                name="active"
                className="border border-gray-300 rounded p-3"
                checked={editJob.active}
                onChange={handleEditChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded p-4 text-xl font-bold hover:bg-green-700 transition-colors"
            >
              Save Job
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-gray-800">Job Listings</h1>
          <Link href="/PostJobs">
            <span className="bg-gradient bg-blue-500 text-xl font-bold rounded px-6 py-3 cursor-pointer w-1/3 text-center">
              Add New Job Postings 
            </span>
          </Link>
        </div>

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
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
          >
            Search
          </button>
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
                  <div key={index} className="mb-4" onClick={() => handleJobClick(job)}>
                    <JobCard
                      title={job.title}
                      company={job.company}
                      location={job.location}
                      salary={job.salary}
                      job_type={jobTypeMapping[job.job_type]}
                      description={`${job.description.substring(0, 100)}...`}
                      onEdit={() => handleEdit(job)}
                      onDelete={() => handleDelete(job.job_id)}
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
                    <strong>Type:</strong> {jobTypeMapping[selectedJob.job_type]}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Required Skills:</strong> {selectedJob.required_skills.join(', ')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Application Deadline:</strong> {formatDate(selectedJob.application_deadline)}
                  </p>
                  <p className="text-gray-700 mb-4">{selectedJob.details ? selectedJob.details : selectedJob.description}</p>
                  {/* <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Applicants</h3>
                    <ul>
                      {applicants.length > 0 ? (
                        applicants.map((applicant, index) => (
                          <li key={index} className="text-gray-700 mb-1">
                            {applicant.user.name.first_name} {applicant.user.name.last_name}
                            {applicant.status && ` - ${applicant.status}`}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No applicants found.</li>
                      )}
                    </ul>
                  </div> */}
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

export default AdminJobs;
