import React, { useEffect, useRef } from 'react';

const HowItWorks = () => {
  const stepRefs = useRef([]);

  useEffect(() => {
    // Animate steps as they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('step-visible');
        }
      });
    }, { threshold: 0.3 });

    stepRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-how-it-works">
      <section className="how-it-works-hero">
        <h1>How FoodRescue Works</h1>
        <p>Simple steps to make a big impact</p>
      </section>

      <div className="steps-flow">
        <div 
          ref={el => stepRefs.current[0] = el}
          className="step-item"
        >
          <div className="step-number">1</div>
          <div className="step-content">
            <div className="step-icon">🏪</div>
            <h3>Restaurant Posts Food</h3>
            <p>Restaurants easily post surplus food through our app</p>
          </div>
        </div>

        <div className="connection-arrow">↓</div>

        <div 
          ref={el => stepRefs.current[1] = el}
          className="step-item"
        >
          <div className="step-number">2</div>
          <div className="step-content">
            <div className="step-icon">🔔</div>
            <h3>NGOs Get Notified</h3>
            <p>Nearby NGOs receive instant notifications</p>
          </div>
        </div>

        <div className="connection-arrow">↓</div>

        <div 
          ref={el => stepRefs.current[2] = el}
          className="step-item"
        >
          <div className="step-number">3</div>
          <div className="step-content">
            <div className="step-icon">🛵</div>
            <h3>Food is Collected</h3>
            <p>Quick pickup and delivery to those in need</p>
          </div>
        </div>
      </div>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4>Instant Matching</h4>
          <p>AI-powered matching between donors and receivers</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h4>Easy to Use</h4>
          <p>Simple interface for both restaurants and NGOs</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌍</div>
          <h4>Real-time Tracking</h4>
          <p>Track food from donation to distribution</p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;