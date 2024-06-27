"use client";
import React, { useState } from 'react';

const AdminProfile = () => {
  const [profilePic, setProfilePic] = useState('/path/to/admin-icon.png');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [organization, setOrganization] = useState('');
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

  const handleProfilePicChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
    setProfilePic('/path/to/admin-icon.png');
    setLinkedInUrl('');
    setEmail('');
    setMobileNumber('');
    setAddress('');
    setName('');
    setJobTitle('');
    setBio('');
    setOrganization('');
    setSkills('');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto shadow-xl rounded-xl p-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Admin Profile</h1>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col items-center border p-6 rounded-lg shadow-lg bg-white">
          <div className="w-36 h-36 mb-6 border-4 border-blue-400 rounded-full overflow-hidden shadow-md">
            <img src={profilePic} alt="Admin Icon" className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <button
            className="rounded px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            onClick={() => document.getElementById('profilePicInput').click()}
          >
            Update Profile Picture
          </button>
        </div>
        <div className="col-span-2 p-6 rounded-lg shadow-lg bg-white">
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
              placeholder="Organization"
              className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
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
          <textarea
            placeholder="Bio"
            className="border rounded p-2 mb-4 h-24 resize-none bg-gray-100 focus:bg-white transition duration-300 w-full text-gray-800"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            className="border rounded p-2 mb-4 w-full bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
          />
          {errors.linkedInUrl && <p className="text-sm text-red-500">{errors.linkedInUrl}</p>}
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