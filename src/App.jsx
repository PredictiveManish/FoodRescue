// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import ForUsers from './pages/ForUsers.jsx';
import Impact from './pages/Impact.jsx';
import GetStarted from './pages/GetStarted.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Contact from './pages/Contact.jsx';
import ThankYou from './pages/ThankYou.jsx';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'how-it-works': return <HowItWorks />;
      case 'for-users': return <ForUsers />;
      case 'impact': return <Impact />;
      case 'get-started': return <GetStarted setCurrentPage={setCurrentPage} />;
      case 'dashboard': return <Dashboard />;
      case 'contact': return <Contact />;
      case 'thank-you': return <ThankYou />;
      default: return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;