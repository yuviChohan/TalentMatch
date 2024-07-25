"use client";
import React, { useState } from 'react';

const AdminProfile = () => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Profile updated successfully!");
    }, 2000);
  };

  const handleReset = () => {
    setEmail('');
    setMobileNumber('');
    setAddress('');
    setName('');
    setJobTitle('');
    setSkills('');
    setErrors({});
    setSuccessMessage('');
  };

  return (
      <div className="w-full max-w-4xl mx-auto shadow-xl rounded-xl p-8 bg-gradient-to-r from-blue-100 to-blue-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Profile</h1>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white">
          <div className="grid grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Name"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Job Title"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Skills"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Mobile Number"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800 col-span-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
              className="bg-gray-500 text-white rounded px-6 py-2 mr-4 hover:bg-gray-600 transition duration-300"
              onClick={handleReset}
          >
            Reset
          </button>
          <button
              className="rounded px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
          >
            {isSubmitting ? (
                <span className="flex items-center">
              <svg
                  className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                  viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </span>
            ) : (
                'Save Profile'
            )}
          </button>
        </div>
        {successMessage && (
            <div className="mt-4 text-center text-green-500 transition-opacity duration-500">
              {successMessage}
            </div>
        )}
      </div>
  );
};

export default AdminProfile;
