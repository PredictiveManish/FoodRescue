// models/FoodPost.js
const mongoose = require('mongoose');

const foodPostSchema = new mongoose.Schema({
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  foodItemName: { type: String, required: true },
  quantity: { type: Number, required: true }, // in meals
  description: String,
  foodType: {
    type: String,
    enum: ['high_perishable', 'medium_perishable', 'low_perishable'],
    required: true
  },
  pickupLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  availableUntil: { type: Date, required: true },
  images: [String], // array of image URLs
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up', 'expired'],
    default: 'available'
  },
  claimedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  claimedAt: Date,
  estimatedExpiry: Date, // Auto-calculated based on food type
  createdAt: { type: Date, default: Date.now }
});

foodPostSchema.index({ pickupLocation: '2dsphere' });
foodPostSchema.index({ estimatedExpiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('FoodPost', foodPostSchema);