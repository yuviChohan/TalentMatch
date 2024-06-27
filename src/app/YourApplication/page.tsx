"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const YourApplications: React.FC = () => {
  const [appliedJobs, setAppliedJobs] = useState<{ title: string; company: string; status: string; }[]>([]);

  useEffect(() => {
    // Fetch applied jobs from an API or use static data
    setAppliedJobs([
      { title: 'Software Engineer', company: 'Tech Solutions Inc.', status: 'Interview Scheduled' },
      { title: 'QA Technician', company: 'Starfield Industry Ltd.', status: 'Applied' },
      { title: 'Marketing Manager', company: 'Marketing Agency X', status: 'Rejected' },
    ]);
  }, []);

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
              <h2 className="text-xl font-bold text-gray-700">{job.title}</h2>
              <p className="text-gray-700">{job.company}</p>
              <p className={`text-${job.status === 'Rejected' ? 'red' : 'green'}-500 font-semibold`}>{job.status}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default YourApplications;
