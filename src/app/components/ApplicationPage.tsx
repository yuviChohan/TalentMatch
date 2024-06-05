// src/app/Components/ApplicationPage.tsx
import React, { useState } from 'react';
import SubmissionPage from './SubmissionPage';

interface ApplicationPageProps {
  job: any;
  goBack: () => void;
  navigateToProfile: () => void;
}

const ApplicationPage: React.FC<ApplicationPageProps> = ({ job, goBack, navigateToProfile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState("User_QA_Technician.pdf");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmitClick = () => {
    setIsSubmitting(true);
  };

  const handleBackClick = () => {
    setIsSubmitting(false);
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setResume(event.target.files[0].name);
    }
  };

  const handleCoverLetterChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetter(event.target.value);
  };

  return (
    <>
      {isSubmitting ? (
        <SubmissionPage job={job} goBack={handleBackClick} navigateToProfile={navigateToProfile} />
      ) : (
        <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
          <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Apply for {job.title}</h1>
              <button onClick={goBack} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">Back to Jobs</button>
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
                  <label className="block border border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-200">
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx"
                      className="hidden"
                      onChange={handleResumeUpload}
                    />
                    <span className="text-gray-500">{resume ? resume : "Click to upload"}</span>
                  </label>
                  {resume && <button className="text-red-500 mt-2" onClick={() => setResume("")}>Remove</button>}
                </div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Cover Letter</h2>
                  <textarea
                    value={coverLetter}
                    onChange={handleCoverLetterChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={5}
                    placeholder="Write your cover letter here"
                  />
                </div>
              </div>

              <div className="w-3/5 p-4">
                <div className="bg-white p-6 rounded shadow-md mb-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">{job.title}</h2>
                  <p className="mb-2 text-gray-800"><strong>Location:</strong> {job.location}</p>
                  <p className="mb-2 text-gray-800"><strong>Salary:</strong> {job.salary}</p>
                  <p className="mb-2 text-gray-800"><strong>Type:</strong> {job.type}</p>
                  <p className="mb-2 text-gray-800"><strong>Description:</strong> {job.description}</p>
                  <p className="mb-2 text-gray-800"><strong>Details:</strong> {job.details}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmitClick}
                className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
              >
                Submit Application
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ApplicationPage;
