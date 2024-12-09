import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Loading: React.FC = () => {
  const { textColor } = useTheme();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={`text-${textColor} text-xl`}>Loading...</div>
    </div>
  );
};

export default Loading;
