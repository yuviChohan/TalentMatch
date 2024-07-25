"use client";
import React from 'react';
import NavBar from '../components/NavBar';
import Link from 'next/link';

const AdminPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-white min-h-screen text-gray-800">
      <main className="container mx-auto py-16 px-4">
        <div className="flex items-center justify-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-6xl font-bold mb-8 transform transition duration-500 hover:scale-110" style={{ color: '#0266FA' }}>
              Admin Dashboard
            </h1>
            <p className="text-gray-700 text-2xl mb-12">
              Welcome to the admin dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/Matches">
                <button className="px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-110 shadow-lg" style={{ backgroundColor: '#0266FA', color: 'white' }}>
                  Match Results
                </button>
              </Link>
              <Link href="/AdminSettings">
                <button className="px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-110 shadow-lg" style={{ backgroundColor: '#0266FA', color: 'white' }}>
                  Settings
                </button>
              </Link>
              <Link href="/AdminNotifications">
                <button className="px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-110 shadow-lg" style={{ backgroundColor: '#0266FA', color: 'white' }}>
                  Notifications
                </button>
              </Link>
              <Link href="/AdminReports">
                <button className="px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-110 shadow-lg" style={{ backgroundColor: '#0266FA', color: 'white' }}>
                  Reports
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
