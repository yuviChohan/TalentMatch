import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

interface NavBarProps {
  links: { name: string, path: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  const { uid, role, setRole } = useAuth();

  const handleRoleSwitch = () => {
    setRole(role === 'admin' ? 'user' : 'admin');
  };

  const getFilteredLinks = () => {
    const commonLinks = links.filter(link => link.name !== 'Sign In');
    if (role === 'admin') {
      return commonLinks.map(link => ({
        ...link,
        path: link.path === '/' ? '/' : `/admin${link.path}`
      }));
    }
    return commonLinks;
  };

  const filteredLinks = getFilteredLinks();
  const isSignedIn = !!uid; // Check if the user is signed in

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <Link href="/RoleBasedHome">
            <img src="/logo.png" alt="Logo" className="h-12 w-55 cursor-pointer" />
          </Link>
        </div>
        <div className="flex items-center space-x-8 ml-auto">
          <ul className="flex space-x-8">
            {filteredLinks.map(link => (
              <li key={link.path}>
                <Link href={link.path}>
                  <span className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="ml-4 flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Link href="/SignIn">
                <span className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300 cursor-pointer">
                  Sign Out
                </span>
              </Link>
              </>
          ) : (
            <>
            <Link href="/SignIn">
              <span className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300 cursor-pointer">
                Sign In
              </span>
            </Link>
          </>
          )}
        </div>
      </nav>
      <div className="h-1 bg-gray-900 shadow-md"></div>
    </>
  );
};

export default NavBar;