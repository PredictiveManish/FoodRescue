// routes/foodPosts.js
const express = require('express');
const router = express.Router();
const FoodPost = require('models/FoodPost');
const User = require('models/User');
const { calculateExpiryTime } = require('FoodRescue/src/server');
const { io } = require('FoodRescue/src/server');

// Create new food post
router.post('/', async (req, res) => {
  try {
    const { restaurant, foodItemName, quantity, description, foodType, pickupLocation, availableUntil, images } = req.body;
    
    const estimatedExpiry = calculateExpiryTime(foodType, availableUntil);
    
    const foodPost = new FoodPost({
      restaurant,
      foodItemName,
      quantity,
      description,
      foodType,
      pickupLocation: {
        type: 'Point',
        coordinates: pickupLocation.coordinates
      },
      availableUntil,
      images,
      estimatedExpiry
    });
    
    await foodPost.save();
    
    // Find nearby NGOs (within 20km)
    const nearbyNGOs = await User.find({
      userType: 'ngo',
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: pickupLocation.coordinates
          },
          $maxDistance: 20000 // 20km in meters
        }
      }
    });
    
    // Send real-time notifications to nearby NGOs
    nearbyNGOs.forEach(ngo => {
      io.to(ngo._id.toString()).emit('new-food-available', {
        title: 'New Food Available Nearby!',
        message: `${foodItemName} - ${quantity} meals available`,
        postId: foodPost._id
      });
    });
    
    res.status(201).json(foodPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get available food posts near location
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 20000 } = req.query; // Default 20km
    
    const foodPosts = await FoodPost.find({
      status: 'available',
      pickupLocation: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).populate('restaurant', 'name address');
    
    res.json(foodPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Claim food post
router.patch('/:id/claim', async (req, res) => {
  try {
    const { ngoId } = req.body;
    
    const foodPost = await FoodPost.findById(req.params.id);
    if (!foodPost) {
      return res.status(404).json({ error: 'Food post not found' });
    }
    
    if (foodPost.status !== 'available') {
      return res.status(400).json({ error: 'Food post not available' });
    }
    
    foodPost.status = 'claimed';
    foodPost.claimedBy = ngoId;
    foodPost.claimedAt = new Date();
    
    await foodPost.save();
    
    // Notify restaurant
    io.to(foodPost.restaurant.toString()).emit('food-claimed', {
      title: 'Food Claimed!',
      message: `Your ${foodPost.foodItemName} has been claimed`,
      postId: foodPost._id
    });
    
    res.json(foodPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;    