import React, { useState } from 'react';

const ForUsers = () => {
  const [activeTab, setActiveTab] = useState('restaurants');

  return (
    <div className="page-for-users">
      <section className="users-hero">
        <h1>Join the Movement</h1>
        <p>Whether you're a restaurant or NGO, we've got you covered</p>
      </section>

      <div className="tab-container">
        <div className="tab-buttons">
          <button 
            className={activeTab === 'restaurants' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('restaurants')}
          >
            🏪 For Restaurants
          </button>
          <button 
            className={activeTab === 'ngos' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('ngos')}
          >
            🤝 For NGOs
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'restaurants' ? (
            <div className="restaurants-content">
              <h2>Benefits for Restaurants</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">💰</div>
                  <h4>Save on Disposal Costs</h4>
                  <p>Reduce waste management expenses</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">🌟</div>
                  <h4>Community Recognition</h4>
                  <p>Be recognized as a socially responsible business</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">📊</div>
                  <h4>Track Your Impact</h4>
                  <p>See how much food you've saved and lives you've helped</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="ngos-content">
              <h2>Benefits for NGOs</h2>
              <div className="benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">🍽️</div>
                  <h4>Access to Quality Food</h4>
                  <p>Receive fresh, nutritious food for your community</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">⏰</div>
                  <h4>Real-time Notifications</h4>
                  <p>Get instant alerts about available food donations</p>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">👥</div>
                  <h4>Build Partnerships</h4>
                  <p>Connect with local businesses and expand your network</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForUsers;