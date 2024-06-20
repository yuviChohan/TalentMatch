"use client";
import React, { useState } from 'react';
import UserProfile from '../UserProfile/page';
import AdminProfile from '../AdminProfile/page';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { role } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-200 to-green-200">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">Profile</h1>
        <div className="flex justify-between items-center mb-8">
          {role === 'admin' && (
            <div>
              <button
                className={`mx-2 p-2 ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded transition-colors duration-300`}
                onClick={() => setIsAdmin(false)}
              >
                User Profile
              </button>
              <button
                className={`mx-2 p-2 ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded transition-colors duration-300`}
                onClick={() => setIsAdmin(true)}
              >
                Admin Profile
              </button>
            </div>
          )}
        </div>
        {isAdmin ? <AdminProfile /> : <UserProfile />}
      </div>
    </main>
  );
};

export default Profile;
