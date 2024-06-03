"use client";

// src/app/page.tsx
import './globals.css';
import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';  // Adjusted import for NavBar
import Footer from './components/Footer';  // Adjusted import for Footer
import Home from './Index/page';  // Adjusted import for Home
import Jobs from './Jobs/page';  // Adjusted import for Jobs
import Profile from './Profile/page';  // Adjusted import for Profile
import Admin from './AdminProfile/page';  // Adjusted import for Admin
import SignIn from './SignIn/page';  // Adjusted import for SignIn

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const links = [
    { name: 'Home', path: 'home' },
    { name: 'Jobs', path: 'jobs' },
    { name: 'Profile', path: 'profile' },
    { name: 'Sign In', path: 'signin' },
    { name: 'Sign Up', path: 'signup' },
  ];

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
    <ThemeProvider>
      <AuthProvider>
        <NavBar links={links} setCurrentPage={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Page;
