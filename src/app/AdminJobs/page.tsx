"use client";

import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import Link from 'next/link';

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

  const formatDate = (dateObject: { day: number, month: number, year: number }) => {
    const { day, month, year } = dateObject;
    return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
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
      const response = await fetch(`https://resumegraderapi.onrender.com/jobs/${job.id}/resumes`);
      const data = await response.json();
      setResumes(data.resumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }

    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/jobs/${job.id}/applicants`);
      const data = await response.json();
      setApplicants(data.applicants || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setApplicants([]);
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
        setJobs(jobs.filter(job => job.id !== jobId));
        setFilteredJobs(filteredJobs.filter(job => job.id !== jobId));
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
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/jobs/${editJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editJob)
      });

      if (response.ok) {
        setJobs(jobs.map(job => (job.id === editJob.id ? editJob : job)));
        setFilteredJobs(filteredJobs.map(job => (job.id === editJob.id ? editJob : job)));
        setIsEditing(false);
        alert('Job updated successfully');
      } else {
        alert('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job');
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditJob({ ...editJob, [name]: value });
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
                value={editJob.required_skills}
                onChange={handleEditChange}
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
                <option value="FULL">Full-time</option>
                <option value="PART">Part-time</option>
                <option value="CONTRACT">Contract</option>
              </select>
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
            <span className="bg-gradient-to-tr from-blue-400 via-blue-200 to-blue-500 text-black text-2xl font-bold rounded px-6 py-3 cursor-pointer w-1/3 text-center">
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
                      job_type={job.job_type}
                      description={`${job.description.substring(0, 100)}...`}
                      onEdit={() => handleEdit(job)}
                      onDelete={() => handleDelete(job.id)}
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
                  <p className="text-gray-700 mb-4">{selectedJob.details ? selectedJob.details : selectedJob.description}</p>
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Applicants</h3>
                    <ul>
                      {applicants.length > 0 ? (
                        applicants.map((applicant, index) => (
                          <li key={index} className="text-gray-700 mb-1">
                            {applicant.name} - {applicant.email}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No applicants found.</li>
                      )}
                    </ul>
                  </div>
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
