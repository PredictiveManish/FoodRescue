import React, { useEffect, useRef } from 'react';

const About = () => {
  const impactRefs = useRef([]);

  useEffect(() => {
    // Number counter animation
    const observers = impactRefs.current.map((ref, index) => {
      if (!ref) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = ref.getAttribute('data-target');
            animateNumber(ref, parseInt(target), 2000);
            observer.unobserve(ref);
          }
        });
      });
      
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const animateNumber = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  };

  return (
    <div className="page-about">
      <section className="mission-section">
        <h1>Our Mission</h1>
        <p className="mission-text">
          We connect restaurants with surplus food to NGOs that serve communities in need.
        </p>
      </section>

      <section className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">September</div>
            <div className="timeline-content">Idea Born</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">September</div>
            <div className="timeline-content">First Pilot Launch</div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">September</div>
            <div className="timeline-content">National Expansion</div>
          </div>
        </div>
      </section>

      <section className="impact-section">
        <h2>Our Impact</h2>
        <div className="impact-numbers">
          <div className="impact-item">
            <div 
              ref={el => impactRefs.current[0] = el}
              data-target="500"
              className="impact-number"
            >0</div>
            <p>Meals Shared</p>
          </div>
          <div className="impact-item">
            <div 
              ref={el => impactRefs.current[1] = el}
              data-target="50"
              className="impact-number"
            >0</div>
            <p>Partner Restaurants</p>
          </div>
          <div className="impact-item">
            <div 
              ref={el => impactRefs.current[2] = el}
              data-target="25"
              className="impact-number"
            >0</div>
            <p>Community NGOs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;