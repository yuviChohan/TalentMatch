import React from 'react';

const AppliedJobs: React.FC = () => {
  // Assuming you have a way to fetch or store applied jobs
  const appliedJobs = [
    {
      title: 'QA Technician',
      location: 'Calgary, Alberta',
    },
    {
      title: 'Software Engineer',
      location: 'Vancouver, British Columbia',
    },
  ];

  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Previously Applied Jobs</h1>
        <ul>
          {appliedJobs.map((job, index) => (
            <li key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-700">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default AppliedJobs;
