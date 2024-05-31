import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { backgroundColor, textColor } = useTheme();

  return (
    <footer className={`bg-gray-800 p-4 text-center text-${textColor}`}>
      <div className="container mx-auto">
        <p>&copy; 2023 SHIFTSIXOS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
