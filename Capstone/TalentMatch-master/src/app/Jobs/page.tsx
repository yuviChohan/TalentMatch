// src/app/Jobs/page.tsx
"use client";
import React, { useState } from 'react';
import UserJobs from '../UserJobs/page'; // Assuming UserJobs is the user-specific jobs component
import AdminJobs from '../AdminJobs/page'; // Assuming AdminJobs is the admin-specific jobs component
import { useAuth } from '../contexts/AuthContext';

const Jobs: React.FC = () => {
  const { role } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-blue-300">
      <div >
        <div className="flex justify-between items-center mb-8">
          {role === 'admin' && (
            <div>
              <button
                className={`mx-2 p-2 ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded transition-colors duration-300`}
                onClick={() => setIsAdmin(false)}
              >
                User Jobs
              </button>
              <button
                className={`mx-2 p-2 ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded transition-colors duration-300`}
                onClick={() => setIsAdmin(true)}
              >
                Admin Jobs
              </button>
            </div>
          )}
        </div>
        {isAdmin ? <AdminJobs /> : <UserJobs />}
      </div>
    </main>
  );
};

export default Jobs;
