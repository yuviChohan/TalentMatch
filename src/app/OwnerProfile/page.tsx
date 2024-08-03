"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const OwnerProfile: React.FC = () => {
  const { uid, user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [userList, setUserList] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.first_name);
      setLastName(user.name.last_name);
      setPhoneNumber(user.phone_number);
      setDateOfBirth(`${user.dob.year}-${String(user.dob.month).padStart(2, '0')}-${String(user.dob.day).padStart(2, '0')}`);
      setEmail(user.email);
    }
  }, [user]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/users?auth_uid=${uid}`);
      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      } else {
        console.error('Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserPrivileges = async (userUid: string) => {
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/users/privileges/${userUid}`);
      if (response.ok) {
        const role = await response.json();
        setCurrentRole(role);
        setIsAdmin(role === 'admin');
        setIsOwner(role === 'owner');
      } else {
        console.error('Failed to fetch user privileges.');
      }
    } catch (error) {
      console.error('Error fetching user privileges:', error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearchUser = () => {
    const user = userList.find((u) => u.email === searchEmail);
    if (user) {
      setSelectedUser(user);
      fetchUserPrivileges(user.uid);
      setMessage('');
    } else {
      setSelectedUser(null);
      setMessage('User not found.');
    }
  };

  const handleUpdatePrivileges = async () => {
    const privilegesData = {
      target_uid: selectedUser.uid,
      is_admin: isAdmin,
      is_owner: isOwner,
      auth_uid: uid,
    };

    try {
      const response = await fetch('https://resumegraderapi.onrender.com/users/privileges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(privilegesData),
      });

      if (response.ok) {
        setMessage('User privileges updated successfully.');
        setCurrentRole(isAdmin ? 'admin' : isOwner ? 'owner' : 'user');
      } else {
        setMessage('Failed to update user privileges.');
        console.error('Error updating privileges:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating privileges:', error);
      setMessage('Error updating user privileges.');
    }
  };

  const handleUpdateUserInfo = async () => {
    const [year, month, day] = dateOfBirth.split('-').map(num => parseInt(num));
    const formattedDOB = `${day.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}`;

    const userInfo = {
      uid: uid,
      first_name: firstName,
      last_name: lastName,
      dob: formattedDOB,
      phone_number: phoneNumber,
      email: email,
    };

    try {
      const response = await fetch('https://resumegraderapi.onrender.com/users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        setSuccessMessage('User info updated successfully.');
      } else {
        console.error('Error updating user info:', response.statusText);
        setSuccessMessage('Failed to update user info.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      setSuccessMessage('Failed to update user info.');
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setDateOfBirth('');
    setEmail('');
    setSearchEmail('');
    setSelectedUser(null);
    setIsAdmin(false);
    setIsOwner(false);
    setMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Owner Profile</h1>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border rounded p-2 mb-4 bg-gray-100 focus:bg-white transition duration-300 text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            onClick={handleUpdateUserInfo}
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
      <div className="p-6 rounded-lg shadow-lg bg-white mt-8">
        <h1 className="text-2xl font-bold mb-4 text-black">Add Admin/Owner</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">User Email:</label>
          <input
            type="email"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
            onClick={handleSearchUser}
          >
            Search User
          </button>
        </div>
        {selectedUser && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-black ">User Details</h2>
            <p className="text-black mb-1"><strong>First Name:</strong> {selectedUser.name.first_name}</p>
            <p className="text-black mb-1"><strong>Last Name:</strong> {selectedUser.name.last_name}</p>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Current Role:</label>
              <p className="text-black">{currentRole}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Make Admin:</label>
              <input
                type="checkbox"
                className="mr-2"
                checked={isAdmin}
                onChange={() => {
                  setIsAdmin(!isAdmin);
                  setIsOwner(isOwner && !isAdmin ? false : isOwner);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Make Owner:</label>
              <input
                type="checkbox"
                className="mr-2"
                checked={isOwner}
                onChange={() => {
                  setIsOwner(!isOwner);
                  setIsAdmin(isAdmin && !isOwner ? false : isAdmin);
                }}
              />
            </div>
            <button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={handleUpdatePrivileges}
            >
              Update Privileges
            </button>
          </div>
        )}
        {message && (
          <div className="mt-4 text-center text-red-500">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerProfile;
