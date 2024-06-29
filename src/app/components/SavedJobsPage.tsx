import React from 'react';
import JobCard from '../components/JobCard';

interface SavedJobsPageProps {
  savedJobs: any[];
  setViewingSavedJobs: (viewing: boolean) => void;
  handleApply: (job: any) => void;
  handleDeleteJob: (jobId: string) => void;
}

const SavedJobsPage: React.FC<SavedJobsPageProps> = ({ savedJobs, setViewingSavedJobs, handleApply, handleDeleteJob }) => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.length > 0 ? (
            savedJobs.map((job, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <JobCard
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  job_type={job.job_type}
                  description={`${job.description.substring(0, 100)}...`}
                />
                <button
                  onClick={() => handleApply(job)}
                  className="bg-blue-500 text-white rounded px-4 py-2 mt-2 w-full"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="bg-red-500 text-white rounded px-4 py-2 mt-2 w-full"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No saved job listings found.</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SavedJobsPage;
