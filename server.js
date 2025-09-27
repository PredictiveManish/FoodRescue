// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Mock database
let foodPosts = [];
let postId = 1;
let users = [];

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Food Rescue API Server is running!',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      foodPosts: {
        get: '/api/food-posts (GET)',
        create: '/api/food-posts (POST)',
        claim: '/api/food-posts/:id/claim (PATCH)'
      },
      auth: {
        login: '/api/auth/login (POST)',
        register: '/api/auth/register (POST)'
      },
      nearby: {
        ngos: '/api/nearby/ngos (GET)',
        restaurants: '/api/nearby/restaurants (GET)'
      },
      user: '/api/my-posts (GET)'
    },
    status: 'OK ✅'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running perfectly!',
    timestamp: new Date().toISOString(),
    foodPostsCount: foodPosts.length
  });
});

// Get all available food posts
app.get('/api/food-posts', (req, res) => {
  const availablePosts = foodPosts.filter(post => post.status === 'available');
  res.json({
    success: true,
    posts: availablePosts,
    total: availablePosts.length
  });
});

// Create food post
app.post('/api/food-posts', (req, res) => {
  try {
    console.log('Received food post data:', req.body);
    
    const { foodItemName, quantity, description, pickupLocation, availableUntil, foodType } = req.body;
    
    // Validation
    if (!foodItemName || !quantity || !pickupLocation || !availableUntil || !foodType) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: foodItemName, quantity, pickupLocation, availableUntil, foodType'
      });
    }
    
    const newPost = {
      id: postId++,
      foodItemName,
      quantity: parseInt(quantity),
      description: description || '',
      pickupLocation,
      availableUntil,
      foodType,
      status: 'available',
      createdAt: new Date().toISOString(),
      restaurant: { name: 'Demo Restaurant', id: 1 },
      coordinates: { lat: 31.3260, lng: 75.5762 } // Jalandhar coordinates
    };
    
    foodPosts.push(newPost);
    
    console.log(`✅ New food posted: ${foodItemName} (${quantity} meals)`);
    console.log(`📢 Notification sent to nearby NGOs`);
    
    res.json({
      success: true,
      post: newPost,
      message: 'Food posted successfully! NGOs nearby have been notified.'
    });
    
  } catch (error) {
    console.error('Error creating food post:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Claim food post
app.patch('/api/food-posts/:id/claim', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = foodPosts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).json({ success: false, error: 'Food post not found' });
    }
    
    if (foodPosts[postIndex].status !== 'available') {
      return res.status(400).json({ success: false, error: 'Food already claimed' });
    }
    
    foodPosts[postIndex].status = 'claimed';
    foodPosts[postIndex].claimedBy = { name: 'Demo NGO', id: 1 };
    foodPosts[postIndex].claimedAt = new Date().toISOString();
    
    console.log(`✅ Food claimed: ${foodPosts[postIndex].foodItemName}`);
    
    res.json({
      success: true,
      message: 'Food claimed successfully! Contact the restaurant for pickup details.'
    });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get restaurant's posts
app.get('/api/my-posts', (req, res) => {
  const myPosts = foodPosts.filter(post => post.restaurant.id === 1);
  res.json({ success: true, posts: myPosts });
});

// Mock authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', email);
  
  const user = {
    id: 1,
    name: 'Demo User',
    email: email,
    userType: email.includes('ngo') ? 'ngo' : 'restaurant'
  };
  
  res.json({
    success: true,
    user: user,
    token: 'mock-token-' + Date.now(),
    message: 'Login successful!'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, userType } = req.body;
  
  const user = {
    id: users.length + 1,
    name,
    email,
    userType
  };
  
  users.push(user);
  
  console.log('New user registered:', user);
  
  res.json({
    success: true,
    user: user,
    token: 'mock-token-' + Date.now(),
    message: 'Registration successful!'
  });
});

// Get nearby NGOs (mock data for Jalandhar)
app.get('/api/nearby/ngos', (req, res) => {
  const ngos = [
    { id: 1, name: 'Robin Hood Army', distance: '1.2km', volunteers: 15, coordinates: { lat: 31.3250, lng: 75.5770 } },
    { id: 2, name: 'Feeding India', distance: '2.5km', volunteers: 8, coordinates: { lat: 31.3280, lng: 75.5740 } },
    { id: 3, name: 'No Food Waste', distance: '3.1km', volunteers: 12, coordinates: { lat: 31.3220, lng: 75.5790 } },
    { id: 4, name: 'Roti Bank', distance: '4.3km', volunteers: 20, coordinates: { lat: 31.3300, lng: 75.5720 } }
  ];
  
  res.json({ success: true, ngos });
});

// Get nearby restaurants (mock data for Jalandhar)
app.get('/api/nearby/restaurants', (req, res) => {
  const restaurants = [
    { id: 1, name: 'Pizza Hut', distance: '0.8km', rating: '4.2', coordinates: { lat: 31.3240, lng: 75.5780 } },
    { id: 2, name: 'McDonald\'s', distance: '1.5km', rating: '4.0', coordinates: { lat: 31.3270, lng: 75.5750 } },
    { id: 3, name: 'Domino\'s', distance: '2.2km', rating: '4.1', coordinates: { lat: 31.3210, lng: 75.5800 } },
    { id: 4, name: 'KFC', distance: '3.0km', rating: '4.3', coordinates: { lat: 31.3290, lng: 75.5730 } }
  ];
  
  res.json({ success: true, restaurants });
});

// Notification system
app.get('/api/notifications', (req, res) => {
  const notifications = [
    { id: 1, type: 'info', message: 'New food available nearby!', time: '2 mins ago', read: false },
    { id: 2, type: 'success', message: 'Your food post was claimed!', time: '1 hour ago', read: true },
    { id: 3, type: 'info', message: '3 new restaurants joined nearby', time: '3 hours ago', read: true }
  ];
  
  res.json({ success: true, notifications });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found. Check / for available endpoints.'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Food Rescue Server Started Successfully!`);
  console.log(`=========================================`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌐 Network: http://127.0.0.1:${PORT}`);
  console.log(`\n📋 Available Endpoints:`);
  console.log(`   • GET  / - Server info`);
  console.log(`   • GET  /api/health - Health check`);
  console.log(`   • GET  /api/food-posts - Get available food`);
  console.log(`   • POST /api/food-posts - Create food post`);
  console.log(`   • GET  /api/nearby/ngos - Nearby NGOs`);
  console.log(`   • GET  /api/nearby/restaurants - Nearby restaurants`);
  console.log(`\n💡 Frontend should run on: http://localhost:5173`);
  console.log(`=========================================\n`);
});