import React, { useEffect, useRef } from 'react';

const Home = ({ setCurrentPage }) => {  // Add setCurrentPage prop
  const foodCounterRef = useRef(null);
  
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
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('get-started');
    // Smooth scroll to top
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
          <div className="floating-food-icon">🍎</div>
          <div className="floating-food-icon">🍞</div>
          <div className="floating-food-icon">🥦</div>
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