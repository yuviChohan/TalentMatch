// src/app/AdminProfile/page.tsx

"use client";
import React, { useState, useEffect } from 'react';

const AdminProfile: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [linkedInProfile, setLinkedInProfile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');

  // Ensure client-side only actions are handled inside useEffect
  useEffect(() => {
    // Any client-side specific logic can go here
  }, []);

  return (
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center border p-6 rounded-lg shadow-md bg-gray-50">
            <div className="w-32 h-32 mb-4 border-4 border-gray-300 rounded-full overflow-hidden">
              <img src={profilePicture || "/path/to/admin-icon.png"} alt="Admin Icon" className="w-full h-full object-cover" /> {/* Adjust the path to your admin icon */}
            </div>
            <button className="bg-blue-500 text-white rounded px-4 py-2 mt-4 hover:bg-blue-600 transition duration-300">Update/Add Profile Picture</button>
            <input
                type="text"
                placeholder="LinkedIn Profile URL"
                value={linkedInProfile}
                onChange={(e) => setLinkedInProfile(e.target.value)}
                className="border border-gray-300 rounded p-2 mt-4 w-full text-black"
            />
            <button className="bg-black text-white rounded px-4 py-2 mt-4 hover:bg-gray-800 transition duration-300">Submit</button>
          </div>
          <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email Address:</label>
              <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Mobile Number:</label>
              <input
                  type="text"
                  placeholder="(000)-000-0000"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Address:</label>
              <input
                  type="text"
                  placeholder="XYZ - Admin Road, AB Canada"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full text-black"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-500 text-white rounded px-6 py-2 hover:bg-blue-600 transition duration-300">Save Profile</button>
        </div>
      </div>
  );
};

export default AdminProfile;
//