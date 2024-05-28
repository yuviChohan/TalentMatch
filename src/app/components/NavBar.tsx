// src/app/components/NavBar.tsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';




interface NavBarProps {
  links: { name: string, path: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  const { primaryBorderColor, backgroundColor, frontColor, toggleTheme, accentColor, textColor, isDarkMode} = useTheme();
  const filteredLinks = links.filter(link => link.name !== 'Sign Up');

  return (
    <nav className="flex justify-between items-center p-4" style={{ backgroundColor, color: frontColor }}>
      <Image src={isDarkMode ? "/logoTextBlack.png" : "/logoWhite.png"} alt="Icon" width={50} height={50}  />
      <ul className="flex space-x-4">
        {filteredLinks.map(link => (
          <li key={link.path}>
            <Link href={link.path}>
              <span style={{color: textColor}}>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button color={accentColor} onClick={toggleTheme}>{isDarkMode ? <Brightness7Icon style={{color:textColor}} /> : <Brightness4Icon style={{color:textColor}}/>}</button>
    </nav>
  );
};

export default NavBar;
