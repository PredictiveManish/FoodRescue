// src/components/DarkModeToggle.jsx
import React from 'react';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <button 
      className="dark-mode-toggle"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;