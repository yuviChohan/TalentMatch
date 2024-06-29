import React from 'react';
import Link from 'next/link';

interface SubmissionPageProps {
  job: any;
  goBack: () => void;
}

const SubmissionPage: React.FC<SubmissionPageProps> = ({ job, goBack }) => {
  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">1</div>
            <div className="text-lg text-gray-800">Check your information</div>
            <div className="bg-blue-500 h-1 w-24"></div>
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">2</div>
            <div className="text-lg text-gray-800">Submit application</div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            Application Submitted!!!
          </h1>
        </div>

        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Thank you for applying for {job.title}!</h2>
          <div className="flex justify-center my-4">
            <span role="img" aria-label="success" className="text-8xl">✅</span>
          </div>
          <p className="mb-4 text-gray-800">
            We have received your application and our team will review it shortly. You will be notified via email about the status of your application or you can check your application status in{' '}
            <Link href="/Profile">
              <span className="font-bold cursor-pointer text-blue-500 hover:underline">Profile</span>
            </Link>.
          </p>
          <div className="flex justify-center mt-6">
            <button 
              onClick={goBack} 
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
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