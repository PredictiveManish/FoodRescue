import React, { useEffect, useRef, useState } from 'react';

const Home = ({ setCurrentPage }) => {
  const foodCounterRef = useRef(null);
  const [currentBg, setCurrentBg] = useState(0);
  
  // Background images array
  const backgroundImages = [
    '/src/assets/bg1.jpg',
    '/src/assets/bg2.jpg', 
    '/src/assets/bg3.jpg',
    '/src/assets/bg4.jpg'
  ];

  // Background slideshow effect
  useEffect(() => {
    const animateCounter = () => {
      let count = 0;
      const target = 33;
      const duration = 2000;
      const step = target / (duration / 16);
      
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        if (foodCounterRef.current) {
          foodCounterRef.current.textContent = Math.floor(count) + '%';
        }
      }, 16);
    };

    animateCounter();

    // Background slideshow interval
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(bgInterval);
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJoinNow = () => {
    setCurrentPage('get-started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-home">
      <section className="hero-banner">
        <div className="hero-background">
          {/* Background Images with Fade Animation */}
          {backgroundImages.map((bg, index) => (
            <div 
              key={index}
              className={`bg-image ${index === currentBg ? 'active' : ''}`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="hero-overlay"></div>
          
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">Turning Waste into Hope</h1>
          <button className="cta-button" onClick={handleJoinNow}>Join Now</button>
        </div>
      </section>

      <section className="problem-section">
        <div className="problem-content">
          <div className="counter-display" ref={foodCounterRef}>0%</div>
          <p className="problem-text">of food is wasted globally</p>
          <div className="transition-arrow">↓</div>
          <p className="solution-text">Yet millions go hungry</p>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">🏪</div>
            <h3>Restaurant Posts</h3>
            <p>Restaurants share surplus food</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🔔</div>
            <h3>NGO Gets Notified</h3>
            <p>Nearby organizations receive alerts</p>
          </div>
          <div className="step-card">
            <div className="step-icon">🛵</div>
            <h3>Food is Saved</h3>
            <p>Quick pickup and distribution</p>
          </div>
        </div>
        <button className="action-button" onClick={handleGetStarted}>
          Be a Food Hero – Get Started Today
        </button>
      </section>
    </div>
  );
};

export default Home;