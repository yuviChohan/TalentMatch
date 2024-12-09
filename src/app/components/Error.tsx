import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Error: React.FC<{ message: string }> = ({ message }) => {
  const { errorTextColor } = useTheme();

  return (
    <div className={`text-${errorTextColor} text-center`}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
