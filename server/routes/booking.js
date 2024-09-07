const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/book', async (req, res) => {
  try {
    const {
      userId, hotelName, hotelAddress, hotelPrice, startDate, endDate, rooms, name, mobile, email, totalAmount, discount, payableAmount
    } = req.body;

    if (!userId || !hotelName || !hotelAddress || !hotelPrice || !startDate || !endDate || !rooms || !name || !mobile || !email || !totalAmount || !discount || !payableAmount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new booking
    const booking = new Booking({
      userId, hotelName, hotelAddress, hotelPrice, startDate, endDate, rooms, name, mobile, email, totalAmount, discount, payableAmount
    });

    await booking.save();

    // Update user bookings
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Push booking ID to user's bookings array
    user.bookings.push(booking._id);
    await user.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});

module.exports = router;
