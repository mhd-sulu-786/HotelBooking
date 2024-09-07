const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart'); // Assuming you have a Cart model

// Add a hotel to the cart
router.post('/add', async (req, res) => {
  try {
    const { userId, hotelId, hotelName, hotelImage, hotelPrice } = req.body;

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format.' });
    }

    // Validate the presence of all required fields
    if (!hotelId || !hotelName || !hotelImage || !hotelPrice) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Check if the item already exists in the cart for the same user
    const existingItem = await Cart.findOne({ userId, hotelId });
    if (existingItem) {
      return res.status(400).json({ error: 'Hotel already in cart.' });
    }

    // Create a new cart item
    const newCartItem = new Cart({
      userId,
      hotelId,
      hotelName,
      hotelImage,
      hotelPrice,
    });

    // Save to database
    await newCartItem.save();
    res.status(201).json({ message: 'Added to cart successfully!' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart.' });
  }
});

// GET user by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
