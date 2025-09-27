// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MapPicker from '../components/MapPicker.jsx';

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
      pickupLocation: `Location: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
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
        coordinates: selectedLocation || { lat: 31.3260, lng: 75.5762 } // Default Jalandhar
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

  // Simple Map Display Component for NGO View
  const SimpleMapDisplay = ({ items, type }) => (
    <div style={{ 
      height: '300px', 
      background: '#e8f4f8', 
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      margin: '10px 0',
      border: '2px solid #4CAF50'
    }}>
      <h4>🗺️ {type} Map View</h4>
      <div style={{ 
        height: '200px', 
        background: 'linear-gradient(45deg, #87CEEB, #98FB98)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '10px 0'
      }}>
        <div style={{ fontSize: '48px' }}>📍</div>
        <p><strong>Interactive Map</strong></p>
        <p>Showing {items.length} locations in Jalandhar</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {items.slice(0, 4).map(item => (
          <span key={item.id} style={{
            background: '#4CAF50',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '15px',
            fontSize: '12px'
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
        <h3>🔔 Notifications</h3>
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
        <h1>Dashboard</h1>
        <div className="user-type-toggle">
          <button className={userType === 'restaurant' ? 'active' : ''} 
                  onClick={() => setUserType('restaurant')}>
            🏪 Restaurant View
          </button>
          <button className={userType === 'ngo' ? 'active' : ''} 
                  onClick={() => setUserType('ngo')}>
            🤝 NGO View
          </button>
        </div>
      </div>

      {/* Restaurant View */}
      {userType === 'restaurant' && (
        <>
          <div className="restaurant-tabs">
            <button className={activeTab === 'post' ? 'active' : ''} 
                    onClick={() => setActiveTab('post')}>
              📤 Post Food
            </button>
            <button className={activeTab === 'track' ? 'active' : ''} 
                    onClick={() => setActiveTab('track')}>
              📊 My Posts
            </button>
            <button className={activeTab === 'map' ? 'active' : ''} 
                    onClick={() => setActiveTab('map')}>
              🗺️ Nearby NGOs
            </button>
          </div>

          {activeTab === 'post' ? (
            <div className="post-food-form">
              <h3>Post Surplus Food</h3>
              <form onSubmit={handleSubmitFood}>
                <input type="text" name="foodItemName" placeholder="Food Item Name" 
                       value={foodForm.foodItemName} onChange={handleInputChange} required />
                
                <input type="number" name="quantity" placeholder="Quantity (meals)" 
                       value={foodForm.quantity} onChange={handleInputChange} required />

                <textarea name="description" placeholder="Description" 
                          value={foodForm.description} onChange={handleInputChange} />

                <div className="location-picker">
                  <label>Pickup Location</label>
                  <div className="location-input" style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                    <input 
                      type="text" 
                      value={foodForm.pickupLocation} 
                      readOnly 
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowMap(!showMap)}
                      style={{
                        padding: '10px 15px',
                        background: showMap ? '#ff9800' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      {showMap ? '❌ Close Map' : '🗺️ Open Map'}
                    </button>
                  </div>
                  {showMap && <MapPicker onLocationSelect={handleLocationSelect} />}
                </div>

                <input type="datetime-local" name="availableUntil" 
                       value={foodForm.availableUntil} onChange={handleInputChange} required />

                <select name="foodType" value={foodForm.foodType} onChange={handleInputChange} required>
                  <option value="">Select Food Type</option>
                  <option value="high_perishable">High Perishable (2 hours)</option>
                  <option value="medium_perishable">Medium Perishable (6 hours)</option>
                  <option value="low_perishable">Low Perishable (24 hours)</option>
                </select>

                <button type="submit" disabled={loading} style={{
                  padding: '12px',
                  background: loading ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  width: '100%'
                }}>
                  {loading ? '⏳ Posting...' : '🚀 Post Food'}
                </button>
              </form>
            </div>
          ) : activeTab === 'track' ? (
            <div className="tracking-section">
              <h3>Your Food Posts</h3>
              <div className="food-posts">
                {myPosts.map(post => (
                  <div key={post.id} className={`food-card ${post.status}`} style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    borderLeft: `4px solid ${post.status === 'available' ? '#4CAF50' : '#ff9800'}`
                  }}>
                    <h4>{post.foodItemName}</h4>
                    <p>Quantity: {post.quantity} meals</p>
                    <p>Type: {post.foodType}</p>
                    <p>Location: {post.pickupLocation}</p>
                    <span className={`status ${post.status}`} style={{
                      padding: '3px 8px',
                      background: post.status === 'available' ? '#4CAF50' : '#ff9800',
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: '12px'
                    }}>
                      {post.status}
                    </span>
                    {post.status === 'claimed' && (
                      <button style={{ marginTop: '10px', padding: '5px 10px' }}>
                        View Details
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="map-section">
              <h3>Nearby NGOs in Jalandhar</h3>
              
              <SimpleMapDisplay items={nearbyNGOs} type="NGO" />
              
              <div className="ngos-list" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '15px',
                marginTop: '20px'
              }}>
                {nearbyNGOs.map(ngo => (
                  <div key={ngo.id} className="ngo-card" style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}>
                    <h4>🏢 {ngo.name}</h4>
                    <p>📍 Distance: {ngo.distance}</p>
                    <p>👥 Volunteers: {ngo.volunteers}</p>
                    <button style={{
                      padding: '8px 15px',
                      background: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                      marginTop: '10px'
                    }}>
                      📞 Contact NGO
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
          <div className="available-food">
            <h3>Available Food Nearby</h3>
            <button onClick={fetchData} style={{
              padding: '10px 15px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '15px'
            }}>
              🔄 Refresh Food List
            </button>
            
            <SimpleMapDisplay items={availableFoods} type="Food" />
            
            <div className="food-list" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '15px'
            }}>
              {availableFoods.map(food => (
                <div key={food.id} className="food-card" style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  borderLeft: '4px solid #4CAF50'
                }}>
                  <h4>🍽️ {food.foodItemName}</h4>
                  <p>📊 Quantity: {food.quantity} meals</p>
                  <p>📍 Location: {food.pickupLocation}</p>
                  <p>⏰ Type: {food.foodType}</p>
                  <p>🕐 Posted: {new Date(food.createdAt).toLocaleTimeString()}</p>
                  <button 
                    onClick={() => handleClaimFood(food.id)} 
                    disabled={food.status !== 'available'}
                    style={{
                      padding: '10px',
                      background: food.status === 'available' ? '#4CAF50' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: food.status === 'available' ? 'pointer' : 'not-allowed',
                      width: '100%',
                      marginTop: '10px'
                    }}
                  >
                    {food.status === 'available' ? '✅ Claim Food' : '✅ Claimed ✓'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="map-view" style={{ marginTop: '30px' }}>
            <h3>Nearby Restaurants in Jalandhar</h3>
            
            <SimpleMapDisplay items={nearbyRestaurants} type="Restaurant" />
            
            <div className="restaurants-list" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '15px',
              marginTop: '20px'
            }}>
              {nearbyRestaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-card" style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}>
                  <h4>🏪 {restaurant.name}</h4>
                  <p>📍 Distance: {restaurant.distance}</p>
                  <p>⭐ Rating: {restaurant.rating}</p>
                  <button style={{
                    padding: '8px 15px',
                    background: '#FF9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '10px'
                  }}>
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