// src/app/pages/index.tsx
import React from 'react';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { uid } = useAuth();

  if (!uid) return <Loading />;
  if (uid === 'error') return <Error message="Failed to load data" />;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <div className="flex flex-col items-center justify-center max-w-4xl w-full bg-white bg-opacity-70 shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-extrabold mb-8 text-blue-600">
          Welcome to <span className="text-green-500">SHIFTSIXOS</span>
        </h1>
        <p className="text-2xl mb-8 text-gray-800">
          Your one-stop solution for hiring remote staff for your law firm.
        </p>
        <button className="w-full p-4 mb-4 text-blue-500 bg-white rounded-lg hover:bg-blue-100 transition-colors duration-300">
          Get Started
        </button>
        <button className="w-full p-4 text-green-500 bg-white rounded-lg hover:bg-green-100 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </main>
  );
};

export default Home;
