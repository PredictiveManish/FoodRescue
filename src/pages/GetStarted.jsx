import React, { useState } from 'react';

const GetStarted = ({ setCurrentPage }) => {  // Add setCurrentPage prop
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'restaurant'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Redirect to thank you page after successful submission
    setCurrentPage('thank-you');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempted:', formData);
    // Redirect to dashboard after successful login
    setCurrentPage('dashboard');
  };

  return (
    <div className="page-get-started">
      <div className="auth-container">
        <div className="auth-left">
          <div className="inspiration-content">
            <h2>Join the Food Rescue Movement</h2>
            <div className="floating-food-icons">
              <span className="food-icon">🍎</span>
              <span className="food-icon">🍞</span>
              <span className="food-icon">🥦</span>
              <span className="food-icon">🍗</span>
            </div>
            <p>Every meal saved makes a difference</p>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-tabs">
            <button 
              className={isLogin ? 'auth-tab active' : 'auth-tab'}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'auth-tab active' : 'auth-tab'}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form className="auth-form" onSubmit={isLogin ? handleLogin : handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>I am a</label>
                <select 
                  name="userType" 
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  <option value="restaurant">Restaurant Owner</option>
                  <option value="ngo">NGO Representative</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Login' : 'Create Account'}
            </button>

            {isLogin && (
              <div className="auth-links">
                <button type="button" className="link-button">
                  Forgot Password?
                </button>
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => setIsLogin(false)}
                >
                  Don't have an account? Sign up
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;