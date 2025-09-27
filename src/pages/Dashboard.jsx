// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MapPicker from '../components/MapPicker.jsx';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [userType, setUserType] = useState('restaurant');
  const [activeTab, setActiveTab] = useState('post');
  const [availableFoods, setAvailableFoods] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [nearbyNGOs, setNearbyNGOs] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [foodForm, setFoodForm] = useState({
    foodItemName: '',
    quantity: '',
    description: '',
    pickupLocation: 'Jalandhar, Punjab',
    availableUntil: '',
    foodType: ''
  });

  // Fetch all data
  const fetchData = async () => {
    try {
      const [foodsRes, ngosRes, restaurantsRes, notificationsRes] = await Promise.all([
        fetch('http://localhost:5000/api/food-posts'),
        fetch('http://localhost:5000/api/nearby/ngos'),
        fetch('http://localhost:5000/api/nearby/restaurants'),
        fetch('http://localhost:5000/api/notifications')
      ]);

      const foodsData = await foodsRes.json();
      const ngosData = await ngosRes.json();
      const restaurantsData = await restaurantsRes.json();
      const notificationsData = await notificationsRes.json();

      if (foodsData.success) setAvailableFoods(foodsData.posts);
      if (ngosData.success) setNearbyNGOs(ngosData.ngos);
      if (restaurantsData.success) setNearbyRestaurants(restaurantsData.restaurants);
      if (notificationsData.success) setNotifications(notificationsData.notifications);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/my-posts');
      const data = await response.json();
      if (data.success) setMyPosts(data.posts);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    if (userType === 'restaurant') fetchMyPosts();
  }, [userType]);

  const handleInputChange = (e) => {
    setFoodForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLocationSelect = (coordinates) => {
    setSelectedLocation(coordinates);
    setFoodForm(prev => ({
      ...prev,
      pickupLocation: `Selected Location (${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)})`
    }));
    setShowMap(false);
  };

  const handleSubmitFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const availableUntil = foodForm.availableUntil || 
        new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString().slice(0, 16);

      const postData = {
        ...foodForm,
        availableUntil,
        coordinates: selectedLocation || { lat: 31.3260, lng: 75.5762 }
      };

      const response = await fetch('http://localhost:5000/api/food-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const result = await response.json();

      if (result.success) {
        alert('✅ ' + result.message);
        setFoodForm({
          foodItemName: '', quantity: '', description: '', 
          pickupLocation: 'Jalandhar, Punjab', availableUntil: '', foodType: ''
        });
        setSelectedLocation(null);
        fetchData();
        fetchMyPosts();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error posting food. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimFood = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/food-posts/${foodId}/claim`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ ' + result.message);
        fetchData();
      } else {
        alert('❌ ' + result.error);
      }
    } catch (error) {
      alert('❌ Network error');
    }
  };

  // Simple Map Display Component
  const SimpleMapDisplay = ({ items, type }) => (
    <div className="simple-map-display">
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>🗺️</div>
      <h4>{type} Map View</h4>
      <p>Showing {items.length} locations in Jalandhar</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
        {items.slice(0, 4).map(item => (
          <span key={item.id} style={{
            background: '#4CAF50',
            color: 'white',
            padding: '8px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            📍 {item.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="page-dashboard">
      {/* Notifications Banner */}
      <div className="notifications-banner">
        <h3>🔔 Real-time Notifications</h3>
        <div className="notification-list">
          {notifications.slice(0, 3).map(notif => (
            <div key={notif.id} className={`notification ${notif.read ? 'read' : 'unread'}`}>
              <span>{notif.message}</span>
              <small>{notif.time}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-header">
        <h1>Food Rescue Dashboard</h1>
        <div className="user-type-toggle">
          <button 
            className={userType === 'restaurant' ? 'active' : ''} 
            onClick={() => setUserType('restaurant')}
          >
            🏪 Restaurant View
          </button>
          <button 
            className={userType === 'ngo' ? 'active' : ''} 
            onClick={() => setUserType('ngo')}
          >
            🤝 NGO View
          </button>
        </div>
      </div>

      {/* Restaurant View */}
      {userType === 'restaurant' && (
        <>
          <div className="restaurant-tabs">
            <button 
              className={activeTab === 'post' ? 'active' : ''} 
              onClick={() => setActiveTab('post')}
            >
              📤 Post Food
            </button>
            <button 
              className={activeTab === 'track' ? 'active' : ''} 
              onClick={() => setActiveTab('track')}
            >
              📊 My Posts
            </button>
            <button 
              className={activeTab === 'map' ? 'active' : ''} 
              onClick={() => setActiveTab('map')}
            >
              🗺️ Nearby NGOs
            </button>
          </div>

          {activeTab === 'post' && (
            <div className="post-food-form">
              <h3>Post Surplus Food</h3>
              <form onSubmit={handleSubmitFood} className="form-vertical">
                <div className="form-group">
                  <label>Food Item Name</label>
                  <input 
                    type="text" 
                    name="foodItemName"
                    placeholder="e.g., Fresh Pizza, Vegetable Curry" 
                    value={foodForm.foodItemName} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Quantity (number of meals)</label>
                  <input 
                    type="number" 
                    name="quantity"
                    placeholder="e.g., 10, 25, 50" 
                    value={foodForm.quantity} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Description & Special Instructions</label>
                  <textarea 
                    name="description"
                    placeholder="Describe the food, any special handling instructions, packaging details..."
                    value={foodForm.description} 
                    onChange={handleInputChange} 
                  />
                </div>

                <div className="form-group">
                  <label>Pickup Location</label>
                  <div className="location-picker">
                    <div className="location-input">
                      <input 
                        type="text" 
                        value={foodForm.pickupLocation} 
                        readOnly 
                      />
                      <button 
                        type="button" 
                        className="map-toggle-btn"
                        onClick={() => setShowMap(!showMap)}
                      >
                        {showMap ? '❌ Close Map' : '🗺️ Open Map'}
                      </button>
                    </div>
                    {showMap && <MapPicker onLocationSelect={handleLocationSelect} />}
                  </div>
                </div>

                <div className="form-group">
                  <label>Available Until</label>
                  <input 
                    type="datetime-local" 
                    name="availableUntil"
                    value={foodForm.availableUntil} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Food Type</label>
                  <select 
                    name="foodType" 
                    value={foodForm.foodType} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">Select Food Category</option>
                    <option value="high_perishable">🍦 High Perishable (2-3 hours max) (milk, salads, seafood, cut fruits, dairy desserts)</option>
                    <option value="medium_perishable">🍛 Medium Perishable (6 hours max) (curries, rice, bread, cooked veg, pulses)</option>
                    <option value="low_perishable">🥨 Low Perishable (24 hours max) (dry snacks, biscuits, packaged food, pickles)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="submit-button" 
                  disabled={loading}
                >
                  {loading ? '⏳ Posting Food...' : '🚀 Post Food for Rescue'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'track' && (
            <div className="tracking-section">
              <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
                Your Food Donation History
              </h3>
              <div className="food-posts-grid">
                {myPosts.map(post => (
                  <div key={post.id} className={`food-post-card ${post.status}`}>
                    <div className="post-header">
                      <h4>🍽️ {post.foodItemName}</h4>
                      <span className={`status ${post.status}`}>
                        {post.status === 'available' ? '🟢 Available' : '✅ Claimed'}
                      </span>
                    </div>
                    <div style={{ lineHeight: '1.8' }}>
                      <p><strong>Quantity:</strong> {post.quantity} meals</p>
                      <p><strong>Type:</strong> {post.foodType}</p>
                      <p><strong>Location:</strong> {post.pickupLocation}</p>
                      <p><strong>Posted:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    {post.status === 'claimed' && (
                      <button className="contact-btn" style={{ marginTop: '15px' }}>
                        📞 View Claim Details
                      </button>
                    )}
                  </div>
                ))}
                {myPosts.length === 0 && (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#6c757d',
                    gridColumn: '1 / -1'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>🍽️</div>
                    <h3>No Food Posts Yet</h3>
                    <p>Start by posting your first surplus food donation!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="map-section">
              <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>
                🤝 Nearby NGOs in Jalandhar
              </h3>
              
              <SimpleMapDisplay items={nearbyNGOs} type="NGO" />
              
              <div className="ngos-grid">
                {nearbyNGOs.map(ngo => (
                  <div key={ngo.id} className="ngo-card">
                    <h4>🏢 {ngo.name}</h4>
                    <div style={{ lineHeight: '1.8', margin: '15px 0' }}>
                      <p>📍 <strong>Distance:</strong> {ngo.distance}</p>
                      <p>👥 <strong>Volunteers:</strong> {ngo.volunteers}</p>
                      <p>⭐ <strong>Active in Food Rescue</strong></p>
                    </div>
                    <button className="contact-btn">
                      📞 Contact for Partnership
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* NGO View */}
      {userType === 'ngo' && (
        <div className="ngo-dashboard">
          <div className="available-food-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>🍽️ Available Food Nearby</h3>
              <button onClick={fetchData} className="refresh-btn">
                🔄 Refresh List
              </button>
            </div>
            
            <SimpleMapDisplay items={availableFoods} type="Food Donations" />
            
            <div className="food-posts-grid">
              {availableFoods.map(food => (
                <div key={food.id} className="food-post-card">
                  <div className="post-header">
                    <h4>🍽️ {food.foodItemName}</h4>
                    <span className={`status ${food.status}`}>
                      {food.status === 'available' ? '🟢 Available' : '✅ Claimed'}
                    </span>
                  </div>
                  <div style={{ lineHeight: '1.8' }}>
                    <p><strong>Quantity:</strong> {food.quantity} meals</p>
                    <p><strong>Type:</strong> {food.foodType}</p>
                    <p><strong>Location:</strong> {food.pickupLocation}</p>
                    <p><strong>Posted:</strong> {new Date(food.createdAt).toLocaleTimeString()}</p>
                    <p><strong>Restaurant:</strong> {food.restaurant?.name || 'Local Restaurant'}</p>
                  </div>
                  <button 
                    onClick={() => handleClaimFood(food.id)} 
                    disabled={food.status !== 'available'}
                    className="claim-btn"
                  >
                    {food.status === 'available' ? '✅ Claim This Food' : '✅ Already Claimed'}
                  </button>
                </div>
              ))}
              {availableFoods.length === 0 && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px', 
                  color: '#6c757d',
                  gridColumn: '1 / -1'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '15px' }}>🍽️</div>
                  <h3>No Available Food Right Now</h3>
                  <p>Check back later for new food donations from restaurants.</p>
                </div>
              )}
            </div>
          </div>

          <div className="map-section">
            <h3 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>
              🏪 Partner Restaurants in Jalandhar
            </h3>
            
            <SimpleMapDisplay items={nearbyRestaurants} type="Restaurant" />
            
            <div className="restaurants-grid">
              {nearbyRestaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-card">
                  <h4>🏪 {restaurant.name}</h4>
                  <div style={{ lineHeight: '1.8', margin: '15px 0' }}>
                    <p>📍 <strong>Distance:</strong> {restaurant.distance}</p>
                    <p>⭐ <strong>Rating:</strong> {restaurant.rating}/5</p>
                    <p>🤝 <strong>Active Food Donor</strong></p>
                  </div>
                  <button className="contact-btn">
                    🤝 Contact Restaurant
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;