// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get nearby restaurants for NGOs
router.get('/nearby/restaurants', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 20000 } = req.query;
    
    const restaurants = await User.find({
      userType: 'restaurant',
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).select('name address phone description location');
    
    res.json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get nearby NGOs for restaurants
router.get('/nearby/ngos', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 20000 } = req.query;
    
    const ngos = await User.find({
      userType: 'ngo',
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).select('name address phone description location');
    
    res.json(ngos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user location
router.put('/:id/location', async (req, res) => {
  try {
    const { coordinates } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        location: {
          type: 'Point',
          coordinates: coordinates
        }
      },
      { new: true }
    );
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;