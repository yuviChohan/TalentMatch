import React from 'react';

const Profile: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-10 flex flex-col md:flex-row justify-between items-start">
        <div className="flex flex-col items-center mb-8 md:mb-0 md:w-1/2">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-2 border-gray-300"
              src="/default-profile.png" // Placeholder image
              alt="Profile"
            />
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M4 13.5V16a2 2 0 002 2h2.5l7.148-7.148a2 2 0 00-2.828-2.828L4 13.5z"
                />
              </svg>
            </button>
          </div>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg">Update/Add Profile Picture</button>
          <div className="mt-6 w-full">
            <input
              type="text"
              placeholder="LinkedIn Profile URL"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
            <button className="w-full px-4 py-2 bg-black text-white rounded-lg">Submit</button>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Edit Email Address:</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Edit Mobile Number:</label>
            <input
              type="text"
              placeholder="(000)-000-000"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Edit Address:</label>
            <input
              type="text"
              placeholder="XYZ - ABC Road, AB Canada"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 bg-black text-white rounded-lg mb-6">Contact Technical Department</button>
          <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Sign Out</button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
