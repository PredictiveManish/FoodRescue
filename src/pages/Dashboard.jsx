import React, { useState } from 'react';

const Dashboard = () => {
  const [userType, setUserType] = useState('restaurant');
  const [activeTab, setActiveTab] = useState('post');

  // Mock data
  const availableFoods = [
    { id: 1, name: "Fresh Sandwiches", quantity: "20 meals", location: "1.2km away", time: "2 hours ago" },
    { id: 2, name: "Vegetable Platter", quantity: "15 meals", location: "0.8km away", time: "1 hour ago" },
    { id: 3, name: "Bakery Items", quantity: "30 meals", location: "2.1km away", time: "30 mins ago" }
  ];

  const myPosts = [
    { id: 1, name: "Pasta Dishes", status: "Claimed", quantity: "25 meals" },
    { id: 2, name: "Salad Bowls", status: "Available", quantity: "10 meals" }
  ];

  return (
    <div className="page-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-type-toggle">
          <button 
            className={userType === 'restaurant' ? 'active' : ''}
            onClick={() => setUserType('restaurant')}
          >
            Restaurant View
          </button>
          <button 
            className={userType === 'ngo' ? 'active' : ''}
            onClick={() => setUserType('ngo')}
          >
            NGO View
          </button>
        </div>
      </div>

      {userType === 'restaurant' ? (
        <div className="restaurant-dashboard">
          <div className="dashboard-tabs">
            <button 
              className={activeTab === 'post' ? 'tab-active' : ''}
              onClick={() => setActiveTab('post')}
            >
              Post Food
            </button>
            <button 
              className={activeTab === 'track' ? 'tab-active' : ''}
              onClick={() => setActiveTab('track')}
            >
              Track Posts
            </button>
          </div>

          {activeTab === 'post' ? (
            <div className="post-food-form">
              <h3>Post Surplus Food</h3>
              <form>
                <div className="form-row">
                  <input type="text" placeholder="Food Item Name" />
                  <input type="number" placeholder="Quantity (meals)" />
                </div>
                <textarea placeholder="Description and special instructions"></textarea>
                <input type="text" placeholder="Pickup Location" />
                <input type="datetime-local" placeholder="Available Until" />
                <button type="submit" className="post-button">Post Food</button>
              </form>
            </div>
          ) : (
            <div className="tracking-section">
              <h3>Your Food Posts</h3>
              <div className="food-posts">
                {myPosts.map(post => (
                  <div key={post.id} className="food-post-card">
                    <div className="post-header">
                      <h4>{post.name}</h4>
                      <span className={`status ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </div>
                    <p>Quantity: {post.quantity}</p>
                    {post.status === 'Claimed' && (
                      <button className="view-details">View Details</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="ngo-dashboard">
          <div className="available-food">
            <h3>Available Food Nearby</h3>
            <div className="food-list">
              {availableFoods.map(food => (
                <div key={food.id} className="food-card">
                  <div className="food-info">
                    <h4>{food.name}</h4>
                    <p>{food.quantity} • {food.location}</p>
                    <span className="time">{food.time}</span>
                  </div>
                  <button className="claim-button">Claim</button>
                </div>
              ))}
            </div>
          </div>

          <div className="map-view">
            <h3>Food Map</h3>
            <div className="simple-map">
              {/* Simple map visualization */}
              <div className="map-point">📍</div>
              <div className="map-point">📍</div>
              <div className="map-point">📍</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;