"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  backgroundColor: string;
  frontColor: string;
  accentColor: string;
  textColor: string;
  accentTextColor: string;
  errorTextColor: string;
  toggleTheme: () => void;
}

const lightTheme = {
  backgroundColor: '#f8f9fa',
  frontColor: '#ffffff',
  accentColor: '#007bff',
  textColor: '#333333',
  accentTextColor: '#007bff',
  errorTextColor: '#ff4d4f',
};

const darkTheme = {
  backgroundColor: '#121212',
  frontColor: '#1e1e1e',
  accentColor: '#bb86fc',
  textColor: '#e1e1e1',
  accentTextColor: '#bb86fc',
  errorTextColor: '#cf6679',
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ ...theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
