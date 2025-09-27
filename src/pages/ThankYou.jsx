import React, { useEffect } from 'react';

const ThankYou = ({ setCurrentPage }) => {  // Add setCurrentPage prop
  useEffect(() => {
    // Confetti effect on component mount
    const createConfetti = () => {
      const confettiContainer = document.querySelector('.confetti-container');
      if (confettiContainer) {
        for (let i = 0; i < 50; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.animationDelay = Math.random() * 3 + 's';
          confetti.style.background = ['#4CAF50', '#FF6B6B', '#4ECDC4', '#FFD166'][Math.floor(Math.random() * 4)];
          confettiContainer.appendChild(confetti);
        }
      }
    };

    createConfetti();
  }, []);

  const handleContinue = () => {
    setCurrentPage('dashboard');
  };

  const handleShare = (platform) => {
    // Simulate social sharing
    console.log(`Sharing on ${platform}`);
    // Add actual sharing functionality here
  };

  return (
    <div className="page-thank-you">
      <div className="confetti-container"></div>
      
      <section className="thank-you-content">
        <div className="thank-you-icon">🎉</div>
        <h1>Thank You for Joining!</h1>
        <p className="thank-you-message">
          Every meal saved makes a difference. Together, we're turning waste into hope.
        </p>
        
        <div className="impact-stats">
          <div className="impact-stat">
            <div className="stat-number">1</div>
            <div className="stat-label">meal saved = 1 life touched</div>
          </div>
        </div>

        <div className="call-to-action">
          <h2>Spread the Word</h2>
          <p>Help us grow the movement by sharing with others</p>
          <div className="social-share">
            <button className="share-button" onClick={() => handleShare('facebook')}>📱 Share</button>
            <button className="share-button" onClick={() => handleShare('email')}>📧 Email</button>
            <button className="share-button" onClick={() => handleShare('twitter')}>🐦 Tweet</button>
          </div>
        </div>

        <button className="continue-button" onClick={handleContinue}>
          Continue to Dashboard
        </button>
      </section>
    </div>
  );
};

export default ThankYou;