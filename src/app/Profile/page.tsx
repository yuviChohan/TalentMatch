"use client";
import React from 'react';
import UserProfile from '../UserProfile/page';
import AdminProfile from '../AdminProfile/page';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const renderProfile = () => {
    if (user?.is_admin) {
      return <AdminProfile />;
    } else if (user?.is_owner) {
      return (
        <div>
          <h2 className="text-3xl font-bold">Owner Profile</h2>
          <p className="text-lg">Owner side pages are under construction.</p>
        </div>
      );
    } else {
      return <UserProfile />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-tr from-blue-400 via-blue-100 to-blue-400">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-5xl font-extrabold text-gray-800">Profile</h1>
        {renderProfile()}
      </div>
    </main>
  );
};

export default Profile;
