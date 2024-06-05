<<<<<<< Updated upstream
import React from 'react';
=======
// NavBar.tsx
import React, { useState } from 'react';
import AdminPage from '../components/AdminPage'; // Import AdminPage component
>>>>>>> Stashed changes

interface NavBarProps {
  links: { name: string; path: string }[];
  setCurrentPage: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ links, setCurrentPage }) => {
  // Filter out the sign-up link
<<<<<<< Updated upstream
  const filteredLinks = links.filter(link => link.name !== 'Sign Up');
=======
  const filteredLinks = links.filter((link) => link.name !== 'Sign Up');
  const [isAdminView, setIsAdminView] = useState(false);

  const switchToAdmin = () => {
    setIsAdminView(true);
    setCurrentPage('Admin'); // Update current page state
  };

  if (isAdminView) {
    return <AdminPage />;
  }
>>>>>>> Stashed changes

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <a href="/" onClick={() => setCurrentPage('/')}>
<<<<<<< Updated upstream
            <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10" /> {/* Adjust the size of the logo */}
          </a>
        </div>
        <div className="flex items-center space-x-8 ml-auto"> {/* Increase the space between items */}
          <ul className="flex space-x-8"> {/* Increase the space between links */}
            {filteredLinks.map(link => (
=======
            <img src="logo.png" alt="Logo" className="h-12 w-55" />
          </a>
        </div>
        <div className="flex items-center space-x-8 ml-auto">
          <ul className="flex space-x-8">
            {filteredLinks.map((link) => (
>>>>>>> Stashed changes
              <li key={link.path}>
                <button
                  className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300"
                  onClick={() => setCurrentPage(link.path)}
                >
                  {link.name}
                </button>
              </li>
            ))}
            <li>
              <button
                className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300"
                onClick={switchToAdmin}
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      </nav>
<<<<<<< Updated upstream
      <div className="h-1 bg-gray-900 shadow-md"></div> {/* Darker line below the navbar */}
=======
      <div className="h-1 bg-gray-900 shadow-md"></div>
>>>>>>> Stashed changes
    </>
  );
};

export default NavBar;
