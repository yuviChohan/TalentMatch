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
        <div className="flex items-center">
          <a href="/" onClick={() => setCurrentPage('/')}>
            <img src="/ShiftSixOs.png" alt="Logo" className="h-12 w-55" /> 
          </a>
        </div>
        <div className="flex items-center space-x-8 ml-auto"> 
          <ul className="flex space-x-8"> 
            {filteredLinks.map(link => (
              <li key={link.path}>
                <button
                  className="text-lg text-black hover:text-blue-600 focus:text-blue-600 hover:font-bold focus:font-bold transition-transform duration-300"
                  onClick={() => setCurrentPage(link.path)}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="h-1 bg-gray-900 shadow-md"></div> 
    </>
  );
};
 
export default NavBar;