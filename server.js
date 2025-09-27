import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Mock database (replace with real MongoDB later)
let foodPosts = [];
let postId = 1;

// Middleware must come BEFORE routes
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

console.log('Running without database connection (development mode)');

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running in development mode!',
    timestamp: new Date().toISOString(),
    database: 'Not connected (development mode)'
  });
});

// Get all food posts - SINGLE DEFINITION
app.get('/api/food-posts', (req, res) => {
  console.log('Fetching food posts. Total:', foodPosts.length);
  res.json({
    success: true,
    posts: foodPosts.filter(post => post.status === 'available'), // Only show available posts
    total: foodPosts.length
  });
});

// Create food post - SINGLE DEFINITION
app.post('/api/food-posts', (req, res) => {
  console.log('Received food post request:', req.body);
  
  try {
    const { foodItemName, quantity, description, pickupLocation, availableUntil, foodType } = req.body;
    
    // Validate required fields
    if (!foodItemName || !quantity || !pickupLocation || !availableUntil || !foodType) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
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
      restaurant: { name: 'Test Restaurant', id: 1 }
    };
    
    foodPosts.push(newPost);
    
    console.log('New food post created:', newPost);
    console.log('Total posts now:', foodPosts.length);
    
    res.json({
      success: true,
      post: newPost,
      message: 'Food posted successfully!'
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
    const { ngoId } = req.body;
    
    const postIndex = foodPosts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Food post not found'
      });
    }
    
    if (foodPosts[postIndex].status !== 'available') {
      return res.status(400).json({
        success: false,
        error: 'Food post already claimed'
      });
    }
    
    foodPosts[postIndex].status = 'claimed';
    foodPosts[postIndex].claimedBy = ngoId;
    foodPosts[postIndex].claimedAt = new Date().toISOString();
    
    res.json({
      success: true,
      post: foodPosts[postIndex],
      message: 'Food claimed successfully!'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Mock login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication
  if (email && password) {
    res.json({
      success: true,
      token: 'mock-jwt-token-for-development',
      user: { id: 1, name: 'Test User', email, userType: 'restaurant' }
    });
  } else {
    res.status(400).json({ success: false, error: 'Invalid credentials' });
  }
});

// Get restaurant's own posts
app.get('/api/my-posts', (req, res) => {
  // In real app, filter by restaurant ID from auth
  const myPosts = foodPosts.filter(post => post.restaurant.id === 1); // Mock restaurant ID
  res.json({
    success: true,
    posts: myPosts
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🍕 Food posts: http://localhost:${PORT}/api/food-posts`);
  console.log(`📝 My posts: http://localhost:${PORT}/api/my-posts`);
});