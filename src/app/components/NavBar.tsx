import React from 'react';

interface NavBarProps {
  links: { name: string, path: string }[];
  setCurrentPage: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ links, setCurrentPage }) => {
  // Filter out the sign-up link
  const filteredLinks = links.filter(link => link.name !== 'Sign Up');

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" /> {/* Adjust the path to your logo */}
          <span className="text-xl font-bold text-blue-600">SHIFTSIXOS</span>
        </div>
        <ul className="flex space-x-4">
          {filteredLinks.map(link => (
            <li key={link.path}>
              <button
                className="text-lg text-gray-700 hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold hover:text-xl focus:text-xl transition-transform duration-300"
                onClick={() => setCurrentPage(link.path)}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-2">
          <img src="/path/to/user-icon.png" alt="User Icon" className="h-8 w-8" /> {/* Adjust the path to your user icon */}
          <span className="text-gray-700">User</span>
        </div>
      </nav>
      <div className="h-1 bg-gray-900 shadow-md"></div> {/* Darker line below the navbar */}
    </>
  );
};

export default NavBar;
