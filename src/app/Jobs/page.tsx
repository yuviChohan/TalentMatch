"use client";
import React from 'react';
import UserJobs from '../UserJobs/page'; 
import AdminJobs from '../AdminJobs/page';
import { useAuth } from '../contexts/AuthContext';

const Jobs: React.FC = () => {
  const { user } = useAuth();

  const renderJobs = () => {
    if (user?.is_admin) {
      return <AdminJobs />;
    } else if (user?.is_owner) {
      return (
        <div>
          <h2 className="text-3xl font-bold">Owner Jobs</h2>
          <p className="text-lg">Owner side pages are under construction.</p>
        </div>
      );
    } else {
      return <UserJobs />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-tr from-blue-200 via-indigo-200 to-blue-300">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">Jobs</h1>
        {renderJobs()}
      </div>
    </main>
  );
};

export default Jobs;
