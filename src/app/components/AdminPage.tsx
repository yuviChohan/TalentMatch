// AdminPage.tsx
import React from 'react';

const AdminPage: React.FC = () => {
  const handleUploadJobListing = () => {
    // Logic for uploading new job listings
    console.log('Uploading new job listing...');
  };

  const handleReviewApplicants = () => {
    // Logic for reviewing applicants
    console.log('Reviewing applicants...');
  };

  const handleViewSelectedApplicants = () => {
    // Logic for viewing selected applicants
    console.log('Viewing selected applicants...');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-3xl font-semibold mb-8">Admin Panel</h1>
      <div className="flex flex-col space-y-4">
        <button
          className="p-3 bg-white text-blue-500 rounded-md hover:bg-blue-100 transition-colors duration-300"
          onClick={handleUploadJobListing}
        >
          Upload New Job Listing
        </button>
        <button
          className="p-3 bg-white text-blue-500 rounded-md hover:bg-blue-100 transition-colors duration-300"
          onClick={handleReviewApplicants}
        >
          Review Applicants
        </button>
        <button
          className="p-3 bg-white text-blue-500 rounded-md hover:bg-blue-100 transition-colors duration-300"
          onClick={handleViewSelectedApplicants}
        >
          View Selected Applicants
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
