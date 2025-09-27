import React, { useState } from 'react';

const Impact = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      name: "Maria's Kitchen",
      quote: "We've saved over 200 meals monthly and built great community relationships.",
      image: "🍕",
      impact: "500+ meals saved"
    },
    {
      id: 2,
      name: "Hope Shelter",
      quote: "FoodRescue helps us provide nutritious meals to 100+ people daily.",
      image: "🏠",
      impact: "3000+ meals served"
    },
    {
      id: 3,
      name: "Green Bites Cafe",
      quote: "Reduced our food waste by 80% while helping those in need.",
      image: "☕",
      impact: "700+ meals donated"
    }
  ];

  return (
    <div className="page-impact">
      <section className="impact-hero">
        <h1>Real Stories, Real Impact</h1>
        <p>See how we're making a difference together</p>
      </section>

      <section className="stories-section">
        <div className="stories-container">
          {stories.map((story, index) => (
            <div 
              key={story.id}
              className={`story-card ${index === activeStory ? 'active' : ''}`}
              onClick={() => setActiveStory(index)}
            >
              <div className="story-image">{story.image}</div>
              <h3>{story.name}</h3>
              <p className="story-impact">{story.impact}</p>
            </div>
          ))}
        </div>

        <div className="story-detail">
          <div className="quote-mark">"</div>
          <p className="story-quote">{stories[activeStory].quote}</p>
          <div className="story-author">- {stories[activeStory].name}</div>
        </div>
      </section>

      <section className="impact-map">
        <h2>Our Reach</h2>
        <div className="map-visual">
          <div className="map-point" style={{ top: '30%', left: '40%' }}>
            <div className="pulse-effect"></div>
            <div className="map-label">New York</div>
          </div>
          <div className="map-point" style={{ top: '50%', left: '30%' }}>
            <div className="pulse-effect"></div>
            <div className="map-label">Chicago</div>
          </div>
          <div className="map-point" style={{ top: '60%', left: '50%' }}>
            <div className="pulse-effect"></div>
            <div className="map-label">Los Angeles</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;