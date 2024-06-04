import React from 'react';

interface SubmissionPageProps {
  job: any;
  goBack: () => void;
}

const SubmissionPage: React.FC<SubmissionPageProps> = ({ job, goBack }) => {
  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Application Submitted</h1>
          <button onClick={goBack} className="bg-blue-500 text-white rounded px-4 py-2">Back</button>
        </div>
        
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Thank you for applying for {job.title}!</h2>
          <p className="mb-4 text-gray-800">We have received your application and our team will review it shortly. You will be notified via email about the status of your application.</p>
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={goBack} 
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Back to Job Listings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubmissionPage;
