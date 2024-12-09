"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminProfile: React.FC = () => {
  const { uid, user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.name.first_name || '');
      setLastName(user.name.last_name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone_number || ''); 
      const dobString = `${user.dob.year}-${String(user.dob.month).padStart(2, '0')}-${String(user.dob.day).padStart(2, '0')}`;
      setDateOfBirth(dobString);
    }
  }, [user]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!email) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);

    const dobParts = dateOfBirth.split('-');
    const formattedDob = `${dobParts[2]}${dobParts[1]}${dobParts[0]}`;

    const userInfo = {
      uid: uid,
      first_name: firstName,
      last_name: lastName,
      dob: formattedDob,
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
        setSuccessMessage('Profile updated successfully!');
      } else {
        setErrors({ form: 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ form: 'Error updating profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (user) {
      setFirstName(user.name.first_name || '');
      setLastName(user.name.last_name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone_number || ''); 
      const dobString = `${user.dob.year}-${String(user.dob.month).padStart(2, '0')}-${String(user.dob.day).padStart(2, '0')}`;
      setDateOfBirth(dobString);
    }
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="p-6 rounded-lg shadow-lg bg-white">
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
        {Object.keys(errors).map((errorKey) => (
          <div key={errorKey} className="text-red-500">
            {errors[errorKey]}
          </div>
        ))}
        {successMessage && (
          <div className="mt-4 text-center text-green-500 transition-opacity duration-500">
            {successMessage}
          </div>
        )}
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
            disabled={isSubmitting}
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
      </div>
    </div>
  );
};

export default AdminProfile;
