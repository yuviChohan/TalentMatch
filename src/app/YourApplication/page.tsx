"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

interface AppliedJob {
  match_id: number;
  title: string;
  company: string;
  status: string;
  description: string;
}

interface Feedback {
  feedback_id: number;
  match_id: number;
  feedback_text: string;
}

const YourApplications: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<null | AppliedJob>(null);
  const [feedback, setFeedback] = useState<Feedback[] | null>(null);
  
  const { uid } = useAuth();

  useEffect(() => {
    if (uid) {
      const fetchAppliedJobs = async () => {
        try {
          const response = await fetch(`https://resumegraderapi.onrender.com/matches/?uid=${uid}`);
          const data = await response.json();

          const jobs = data.map((job: any) => ({
            match_id: job.match_id,
            title: job.job.title,
            company: job.job.company,
            status: job.status,
            description: job.job.description,
          }));

          setAppliedJobs(jobs);
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
        }
      };

      fetchAppliedJobs();
    }
  }, [uid]);

  const fetchFeedback = async (match_id: number) => {
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/feedback/?match_id=${match_id}&all_feedback=false`);
      const data = await response.json();
      setFeedback(data);
      console.log('Feedback fetched:', data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedback(null);
    }
  };

  const handleWithdraw = async (match_id: number, index: number) => {
    if (confirm('Are you sure you want to withdraw your application?')) {
      try {
        const response = await fetch(`https://resumegraderapi.onrender.com/matches/${match_id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedJobs = appliedJobs.filter((_, i) => i !== index);
          setAppliedJobs(updatedJobs);
          alert('Application withdrawn successfully.');
        } else {
          alert('Failed to withdraw application.');
        }
      } catch (error) {
        console.error('Error withdrawing application:', error);
        alert('An error occurred while withdrawing the application.');
      }
    }
  };

  const handleJobClick = async (job: AppliedJob) => {
    setSelectedJob(job);
    await fetchFeedback(job.match_id);
  };

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-400 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Applications</h1>
          <Link href="/Profile">
            <span className="bg-gray-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors">
              Back to Profile
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {appliedJobs.map((job, index) => (
            <div key={index} className="border border-gray-300 rounded p-4 bg-white shadow-sm">
              <h2 className="text-xl font-bold text-black">{job.title}</h2>
              <p className="text-gray-700">{job.company}</p>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mt-2"
                onClick={() => handleJobClick(job)}
              >
                View Details
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 mt-2 ml-2"
                onClick={() => handleWithdraw(job.match_id, index)}
              >
                Withdraw
              </button>
              {selectedJob?.match_id === job.match_id && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Details</h2>
                  <p className="text-black"><strong>Title:</strong> {selectedJob.title}</p>
                  <p className="text-black"><strong>Company:</strong> {selectedJob.company}</p>
                  <p className="text-black"><strong>Description:</strong> {selectedJob.description}</p>
                  <h3 className="text-xl font-semibold text-gray-700 mt-4">Feedback</h3>
                  {feedback && feedback.length > 0 ? (
                    feedback.map((fb) => (
                      <div key={fb.feedback_id} className="border border-gray-300 rounded p-4 bg-white shadow-sm mb-4">
                        <p className="text-black">{fb.feedback_text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No feedback found.</p>
                  )}
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-4"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default YourApplications;
