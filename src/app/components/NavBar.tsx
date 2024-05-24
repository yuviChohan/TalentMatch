// src/app/components/NavBar.tsx
import React from 'react';

interface NavBarProps {
  links: { name: string, path: string }[];
  setCurrentPage: (page: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ links, setCurrentPage }) => {
  // Filter out the sign-up link
  const filteredLinks = links.filter(link => link.name !== 'Sign Up');

  return (
    <nav className="flex justify-between items-center p-4">
      <ul className="flex space-x-4">
        {filteredLinks.map(link => (
          <li key={link.path}>
            <button 
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setCurrentPage(link.path)}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
