"use client";

// src/app/page.tsx
import './globals.css';
import React, { useState } from 'react';
import Home from './Index/page';  
import RoleBased from './RoleBasedHome/page';
import Jobs from './Jobs/page';  
import Profile from './Profile/page';  
import Admin from './AdminProfile/page';  
import SignIn from './SignIn/page'; 

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <RoleBased />;
      case 'jobs':
        return <Jobs />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <Admin />;
      case 'signin':
        return <SignIn />;
      default:
        return <RoleBased />;
    }
  };

  return (
    <main>
      {renderPage()}
    </main>
  );
};

export default Page;
