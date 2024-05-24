// src/app/pages/jobs.tsx
import React from 'react';
import ApplicationCard from '../contexts/ApplicationCard';

const Jobs: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-green-100">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">Jobs Page</h1>
        <p className="text-xl text-gray-600 mb-12">Explore the latest job opportunities curated for you.</p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ApplicationCard 
            title="QA Technician" 
            description="Starfield Industry Ltd. (The Starfield Group)" 
            date="Saved on May 20" 
          />
          <ApplicationCard 
            title="Software Engineer" 
            description="Tech Solutions Inc." 
            date="Saved on May 21" 
          />
          <ApplicationCard 
            title="Product Manager" 
            description="Innovate Corp." 
            date="Saved on May 22" 
          />
        </div>
      </div>
    </main>
  );
};

export default Jobs;
