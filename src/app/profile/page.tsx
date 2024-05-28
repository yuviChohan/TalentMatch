// src/app/pages/profile.tsx
import React from 'react';

const Profile: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10">
        <h1 className="text-5xl font-extrabold mb-8 text-gray-800">Profile Page</h1>
        <p className="text-xl text-gray-600 mb-12">Your profile information is displayed below:</p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <p className="text-gray-600 mb-2"><strong>Name:</strong> John Doe</p>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> john.doe@example.com</p>
            <p className="text-gray-600"><strong>Joined:</strong> January 1, 2023</p>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Account Details</h2>
            <p className="text-gray-600 mb-2"><strong>Username:</strong> johndoe123</p>
            <p className="text-gray-600 mb-2"><strong>Status:</strong> Active</p>
            <p className="text-gray-600"><strong>Role:</strong> User</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
