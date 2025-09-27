// src/components/Footer.jsx
import React, { useEffect, useRef } from 'react';

const Footer = ({ setCurrentPage }) => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Footer entrance animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('footer-visible');
        }
      });
    }, { threshold: 0.3 });

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSocialClick = (platform) => {
    // Simulate social media interactions
    console.log(`Sharing on ${platform}`);
    // Add ripple effect
    const button = document.querySelector(`.social-${platform}`);
    if (button) {
      button.classList.add('social-clicked');
      setTimeout(() => button.classList.remove('social-clicked'), 600);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="main-footer" ref={footerRef}>
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25" 
                className="footer-wave-path"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5" 
                className="footer-wave-path"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                className="footer-wave-path"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo" onClick={() => setCurrentPage('home')}>
            <span className="logo-icon">🍽️</span>
            <span className="logo-text">FoodRescue</span>
          </div>
          <p className="footer-mission">Turning waste into hope, one meal at a time.</p>
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <button 
              className="footer-link"
              onClick={() => setCurrentPage('about')}
            >
              <span className="link-icon">📖</span>
              About Us
            </button>
            <button 
              className="footer-link"
              onClick={() => setCurrentPage('how-it-works')}
            >
              <span className="link-icon">⚙️</span>
              How It Works
            </button>
            <button 
              className="footer-link"
              onClick={() => setCurrentPage('impact')}
            >
              <span className="link-icon">📊</span>
              Our Impact
            </button>
            <button 
              className="footer-link"
              onClick={() => setCurrentPage('contact')}
            >
              <span className="link-icon">📞</span>
              Contact
            </button>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Join the Movement</h4>
          <div className="footer-actions">
            <button 
              className="footer-action-button"
              onClick={() => setCurrentPage('get-started')}
            >
              <span className="action-icon">👥</span>
              Become a Partner
            </button>
            <button 
              className="footer-action-button"
              onClick={() => setCurrentPage('get-started')}
            >
              <span className="action-icon">🤝</span>
              Volunteer
            </button>
            <button 
              className="footer-action-button"
              onClick={() => setCurrentPage('get-started')}
            >
              <span className="action-icon">💝</span>
              Donate
            </button>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <button 
              className="social-link social-facebook"
              onClick={() => handleSocialClick('facebook')}
            >
              <span className="social-icon">📘</span>
              Facebook
            </button>
            <button 
              className="social-link social-twitter"
              onClick={() => handleSocialClick('twitter')}
            >
              <span className="social-icon">🐦</span>
              Twitter
            </button>
            <button 
              className="social-link social-instagram"
              onClick={() => handleSocialClick('instagram')}
            >
              <span className="social-icon">📸</span>
              Instagram
            </button>
            <button 
              className="social-link social-linkedin"
              onClick={() => handleSocialClick('linkedin')}
            >
              <span className="social-icon">💼</span>
              LinkedIn
            </button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} FoodRescue by Aryavarti. All rights reserved.</p>
          <div className="footer-legal">
            <button className="legal-link">Privacy Policy</button>
            <button className="legal-link">Terms of Service</button>
            <button className="legal-link">Cookie Policy</button>
          </div>
          <button className="scroll-to-top" onClick={scrollToTop}>
            <span className="scroll-icon">↑</span>
            Back to Top
          </button>
        </div>
      </div>

      {/* Floating food icons in footer */}
      <div className="footer-floating-icons">
        <span className="floating-icon">🍎</span>
        <span className="floating-icon">🍞</span>
        <span className="floating-icon">🥦</span>
        <span className="floating-icon">🍗</span>
      </div>
    </footer>
  );
};

export default Footer;