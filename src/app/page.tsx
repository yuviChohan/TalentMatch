"use client";

// src/app/page.tsx
import './globals.css';
import React, { useState } from 'react';
import Home from './Index/page';  // Adjusted import for Home
import Jobs from './Jobs/page';  // Adjusted import for Jobs
import Profile from './Profile/page';  // Adjusted import for Profile
import Admin from './AdminProfile/page';  // Adjusted import for Admin
import SignIn from './SignIn/page';  // Adjusted import for SignIn

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'jobs':
        return <Jobs />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <Admin />;
      case 'signin':
        return <SignIn />;
      default:
        return <Home />;
    }
  };

  return (
    <main>
      {renderPage()}
    </main>
  );
};

export default Page;
