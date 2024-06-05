import React, { useState } from 'react';
import UserProfile from './UserProfile';
import AdminProfile from './AdminProfile';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { role } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-800">Profile</h1>
          {role === 'admin' && (
            <div>
              <button
                className={`mx-2 p-2 ${!isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                onClick={() => setIsAdmin(false)}
              >
                User Profile
              </button>
              <button
                className={`mx-2 p-2 ${isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                onClick={() => setIsAdmin(true)}
              >
                Admin Profile
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profilePicture ? (profilePicture as string) : 'default-profile.png'}
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-gray-200 shadow-lg"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>
        <div className="transition-all duration-500 ease-in-out">
          {isAdmin ? <AdminProfile /> : <UserProfile />}
        </div>
      </div>
    </main>
  );
};

export default Profile;
