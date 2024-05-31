import React from 'react';

const ApplicationPage: React.FC = () => {
  const appliedJobs: any[] = []; // Fetch applied jobs or get from state

  return (
    <div>
      <h1>My Applied Jobs</h1>
      {/* Display applied jobs */}
      {appliedJobs.map((job, index) => (
        <div key={index}>
          {/* Display job details */}
        </div>
      ))}
      {/* Button to navigate back */}
      <button onClick={() => window.history.back()} className="bg-blue-500 text-white rounded px-4 py-2 mt-2">Go Back</button>
    </div>
  );
};

export default ApplicationPage;
