import React from 'react';

const AdminProfile: React.FC = () => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">Admin Profile</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <img src="/path/to/admin-icon.png" alt="Admin Icon" className="h-32 w-32 mb-4" /> {/* Adjust the path to your admin icon */}
          <button className="bg-blue-500 text-white rounded px-4 py-2">Update/Add Profile Picture</button>
          <input type="text" placeholder="LinkedIn Profile URL" className="border border-gray-300 rounded p-2 mt-4 w-full text-black" />
          <button className="bg-black text-white rounded px-4 py-2 mt-4">Submit</button>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700">Edit Email Address:</label>
            <input type="email" placeholder="admin@gmail.com" className="border border-gray-300 rounded p-2 w-full text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Edit Mobile Number:</label>
            <input type="text" placeholder="(000)-000-0000" className="border border-gray-300 rounded p-2 w-full text-black" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Edit Address:</label>
            <input type="text" placeholder="XYZ - Admin Road, AB Canada" className="border border-gray-300 rounded p-2 w-full text-black" />
          </div>
          <button className="bg-black text-white rounded px-4 py-2">Contact Technical Department</button>
        </div>
      </div>
      <button className="bg-gray-700 text-white rounded px-4 py-2 mt-4">Sign Out</button>
    </div>
  );
};

export default AdminProfile;
