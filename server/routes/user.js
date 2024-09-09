const express = require('express');
const userrouter = express.Router();
const User = require('../models/user');

// GET /users/:id - Get user details by ID
userrouter.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

// PUT /users/:id - Update user details by ID
userrouter.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, booking, isAdmin } = req.body;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields
    if (email) user.email = email;
    if (password) user.password = password;
    if (booking) user.booking = booking;
    if (typeof isAdmin === 'boolean') user.isAdmin = isAdmin;

    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Error updating user data' });
  }
});

// DELETE /users/:id - Delete user by ID
userrouter.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user
    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});
// GET /users/:id/bookings - Fetch bookings for a specific user
userrouter.get('/users/:id/bookings', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate('bookings');  // Ensure it's 'bookings', not 'booking'
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ bookings: user.bookings });
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ error: 'Error fetching user bookings' });
    }
  });
  
  

module.exports = userrouter;
