import React from 'react';

interface ApplicationPageProps {
  job: any;
  goBack: () => void;
  navigateToProfile: () => void;
}

const ApplicationPage: React.FC<ApplicationPageProps> = ({ job, goBack, navigateToProfile }) => {
  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h1>
          <button onClick={goBack} className="bg-blue-500 text-white rounded px-4 py-2">Back to Jobs</button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center">1</div>
            <div className="text-lg text-gray-800">Check your information</div>
            <div className="bg-blue-500 h-1 w-24"></div>
            <div className="bg-gray-300 text-gray-500 rounded-full h-8 w-8 flex items-center justify-center">2</div>
            <div className="text-lg text-gray-500">Submit application</div>
          </div>
        </div>

        <div className="flex">
          <div className="w-2/5 p-4">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Your Resume:</h2>
              <div className="bg-gray-200 p-4 rounded-lg mb-4">
                <div className="text-gray-800">User_QA_Technician.pdf</div> {/* Change this to dynamically display the user's resume file name */}
              </div>
              <div className="flex justify-center">
                <button onClick={navigateToProfile} className="bg-blue-500 text-white rounded px-4 py-2">Upload a new resume</button>
              </div>
            </div>
          </div>

          <div className="w-3/5 p-4">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">{job.title}</h2>
              <p className="mb-2 text-gray-800"><strong>Location:</strong> {job.location}</p>
              <p className="mb-2 text-gray-800"><strong>Salary:</strong> {job.salary}</p>
              <p className="mb-2 text-gray-800"><strong>Type:</strong> {job.type}</p>
              <p className="mb-2 text-gray-800"><strong>Description:</strong> {job.description}</p>
              <p className="mb-2 text-gray-800"><strong>Details:</strong> {job.details}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApplicationPage;
