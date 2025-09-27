import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userType, setUserType] = useState('restaurant');
  const [activeTab, setActiveTab] = useState('post');
  const [availableFoods, setAvailableFoods] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form state for posting food
  const [foodForm, setFoodForm] = useState({
    foodItemName: '',
    quantity: '',
    description: '',
    pickupLocation: '',
    availableUntil: '',
    foodType: '',
    image: null
  });

  // Fetch available foods for NGOs
  const fetchAvailableFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/food-posts');
      const data = await response.json();
      if (data.success) {
        setAvailableFoods(data.posts);
      }
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  // Fetch restaurant's own posts
  // Fetch restaurant's own posts
const fetchMyPosts = async () => {
  try {
    console.log('Fetching my posts...');
    const response = await fetch('http://localhost:5000/api/my-posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched my posts:', data);
    
    if (data.success) {
      setMyPosts(data.posts);
    } else {
      console.error('API returned error:', data.error);
    }
  } catch (error) {
    console.error('Error fetching my posts:', error);
  }
};

  // Load data when component mounts or userType changes
  useEffect(() => {
    if (userType === 'ngo') {
      fetchAvailableFoods();
    } else if (userType === 'restaurant') {
      fetchMyPosts();
    }
  }, [userType]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFoodForm(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  // Submit food post
  const handleSubmitFood = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log('Submitting food form:', foodForm);

  try {
    const postData = {
      foodItemName: foodForm.foodItemName,
      quantity: parseInt(foodForm.quantity),
      description: foodForm.description,
      pickupLocation: foodForm.pickupLocation,
      availableUntil: foodForm.availableUntil,
      foodType: foodForm.foodType
    };

    console.log('Sending data to server:', postData);

    const response = await fetch('http://localhost:5000/api/food-posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Response data:', result);

    if (result.success) {
      alert('Food posted successfully!');
      // Reset form
      setFoodForm({
        foodItemName: '',
        quantity: '',
        description: '',
        pickupLocation: '',
        availableUntil: '',
        foodType: '',
        image: null
      });
      // Refresh posts
      fetchMyPosts();
    } else {
      alert('Error posting food: ' + result.error);
    }
  } catch (error) {
    console.error('Error posting food:', error);
    alert('Error posting food: ' + error.message);
  } finally {
    setLoading(false);
  }
};
  // Claim food (for NGOs)
  const handleClaimFood = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/food-posts/${foodId}/claim`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ngoId: 'mock-ngo-id' // In real app, use actual NGO ID from auth
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Food claimed successfully!');
        // Refresh available foods
        fetchAvailableFoods();
      } else {
        alert('Error claiming food: ' + result.error);
      }
    } catch (error) {
      console.error('Error claiming food:', error);
    }
  };

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

      {/* Restaurant View */}
      {userType === 'restaurant' && (
        <>
          <div className="restaurant-tabs">
            <button
              className={activeTab === 'post' ? 'active' : ''}
              onClick={() => setActiveTab('post')}
            >
              Post Food
            </button>
            <button
              className={activeTab === 'track' ? 'active' : ''}
              onClick={() => setActiveTab('track')}
            >
              My Posts
            </button>
          </div>

          {activeTab === 'post' ? (
            <div className="post-food-form">
              <h3>Post Surplus Food</h3>
              <form onSubmit={handleSubmitFood}>
                <div className="form-row">
                  <input 
                    type="text" 
                    name="foodItemName"
                    placeholder="Food Item Name" 
                    value={foodForm.foodItemName}
                    onChange={handleInputChange}
                    required
                  />
                  <input 
                    type="number" 
                    name="quantity"
                    placeholder="Quantity (meals)" 
                    value={foodForm.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <textarea 
                  name="description"
                  placeholder="Description and special instructions"
                  value={foodForm.description}
                  onChange={handleInputChange}
                ></textarea>
                
                <input 
                  type="text" 
                  name="pickupLocation"
                  placeholder="Pickup Location" 
                  value={foodForm.pickupLocation}
                  onChange={handleInputChange}
                  required
                />
                
                <input 
                  type="datetime-local" 
                  name="availableUntil"
                  placeholder="Available Until" 
                  value={foodForm.availableUntil}
                  onChange={handleInputChange}
                  required
                />

                <select 
                  name="foodType"
                  value={foodForm.foodType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Food Type</option>
                  <option value="high_perishable">
                    High Perishable (milk, salads, seafood, cut fruits, dairy desserts)
                  </option>
                  <option value="medium_perishable">
                    Medium PerishablMedium Perishable (curries, rice, bread, cooked veg, pulses)
                  </option>
                  <option value="low_perishable">
                    Medium Perishable (curries, rice, bread, cooked veg, pulses)
                  </option>
                </select>

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                />

                <button type="submit" className="post-button" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Food'}
                </button>
              </form>
            </div>
          ) : (
            <div className="tracking-section">
              <h3>Your Food Posts</h3>
              <div className="food-posts">
                {myPosts.map(post => (
                  <div key={post.id} className="food-post-card">
                    <div className="post-header">
                      <h4>{post.foodItemName || post.name}</h4>
                      <span className={`status ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </div>
                    <p>Quantity: {post.quantity} meals</p>
                    <p>Type: {post.foodType}</p>
                    {post.status === 'claimed' && (
                      <button className="view-details">View Details</button>
                    )}
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
            <button onClick={fetchAvailableFoods} className="refresh-btn">
              Refresh
            </button>
            <div className="food-list">
              {availableFoods.map(food => (
                <div key={food.id} className="food-card">
                  <div className="food-info">
                    <h4>{food.foodItemName || food.name}</h4>
                    <p>{food.quantity} meals • {food.pickupLocation || food.location}</p>
                    <span className="time">Posted: {new Date(food.createdAt).toLocaleString()}</span>
                    <p>Type: {food.foodType}</p>
                  </div>
                  <button 
                    className="claim-button"
                    onClick={() => handleClaimFood(food.id)}
                    disabled={food.status !== 'available'}
                  >
                    {food.status === 'available' ? 'Claim' : 'Claimed'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="map-view">
            <h3>Food Map</h3>
            <div className="simple-map">
              {availableFoods.map((food, index) => (
                <div key={food.id} className="map-point">
                  📍 {food.foodItemName}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// Add this inside your return statement, after the debug info
<button onClick={testConnection} style={{background: 'blue', color: 'white', padding: '10px', margin: '10px'}}>
  Test Backend Connection
</button>

// Add this function to your component
const testConnection = async () => {
  try {
    console.log('Testing connection to backend...');
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    console.log('Backend response:', data);
    alert('Backend is reachable: ' + data.message);
  } catch (error) {
    console.error('Connection test failed:', error);
    alert('Cannot reach backend: ' + error.message);
  }
};
export default Dashboard;