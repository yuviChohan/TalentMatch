// src/app/UserProfile/ApplicationsPage.tsx
import React from 'react';

const ApplicationsPage: React.FC<{ applications: { title: string; company: string; status: string; }[] }> = ({ applications }) => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
      <h1 className="text-5xl font-extrabold text-gray-800">Applications</h1>
      <div className="mt-4">
        {applications.map((application, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-4">
            <h2 className="text-lg font-bold text-gray-700">{application.title}</h2>
            <p className="text-gray-600">Company: {application.company}</p>
            <p className="text-gray-600">Status: {application.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
