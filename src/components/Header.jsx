// src/components/Header.jsx
import React from 'react';
import DarkModeToggle from './DarkModeToggle.jsx';

const Header = ({ currentPage, setCurrentPage, isDarkMode, setIsDarkMode }) => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          🍽️ FoodRescue
        </div>
        
        <nav className="navigation">
          <button 
            className={currentPage === 'home' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'about' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
          <button 
            className={currentPage === 'how-it-works' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('how-it-works')}
          >
            How It Works
          </button>
          <button 
            className={currentPage === 'get-started' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('get-started')}
          >
            Join Us
          </button>
        </nav>

        <div className="header-controls">
          <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <button className="login-button">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;