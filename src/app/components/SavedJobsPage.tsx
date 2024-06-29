import React, { useState } from 'react';
import JobCard from '../components/JobCard';

interface SavedJobsPageProps {
  savedJobs: any[];
  setViewingSavedJobs: (viewing: boolean) => void;
  handleApply: (job: any) => void;
  handleDeleteJob: (jobId: string) => void;
}

const SavedJobsPage: React.FC<SavedJobsPageProps> = ({ savedJobs, setViewingSavedJobs, handleApply, handleDeleteJob }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filteredJobs = savedJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-12">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Saved Job Listings</h1>
        <button
          onClick={() => setViewingSavedJobs(false)}
          className="bg-blue-500 text-white rounded px-6 py-3 mb-6"
        >
          Back to Job Listings
        </button>
        <input
          type="text"
          placeholder="Search saved jobs..."
          className="border border-gray-300 rounded p-2 text-gray-700 mb-6 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <JobCard
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  job_type={job.job_type}
                  description={`${job.description.substring(0, 100)}...`}
                />
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-blue-500 text-white rounded px-4 py-2 w-5/12"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-gray-500 text-white rounded px-4 py-2 w-5/12"
                  >
                    View Details
                  </button>
                </div>
                <button
                  onClick={() => setConfirmDelete(job.id)}
                  className="bg-red-500 text-white rounded px-4 py-2 mt-2 w-full"
                >
                  Delete
                </button>
                {confirmDelete === job.id && (
                  <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-center justify-center">
                    <p className="text-white mb-4">Are you sure you want to delete this job?</p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="bg-red-500 text-white rounded px-4 py-2"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="bg-gray-500 text-white rounded px-4 py-2"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No saved job listings found.</div>
          )}
        </div>
      </div>
      {selectedJob && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">{selectedJob.title}</h2>
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
              <strong>Type:</strong> {selectedJob.job_type}
            </p>
            <p className="text-gray-700 mb-4">{selectedJob.description}</p>
            <button
              onClick={() => handleApply(selectedJob)}
              className="bg-blue-500 text-white rounded px-4 py-2 w-full"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SavedJobsPage;
