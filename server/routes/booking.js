const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user');

// POST /book: Create a new booking
router.post('/book', async (req, res) => {
  console.log('Incoming booking data:', req.body);  // Log request body
  try {
    const {
      userId, hotelName, hotelAddress, hotelPrice, startDate, endDate, rooms, name, mobile, email, totalAmount, discount, payableAmount
    } = req.body;

    if (!userId || !hotelName || !hotelAddress || !hotelPrice || !startDate || !endDate || !rooms || !name || !mobile || !email || !totalAmount || !discount || !payableAmount) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate date range
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    // Create the new booking
    const newBooking = new Booking({
      userId,
      hotelName,
      hotelAddress,
      hotelPrice,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      rooms,
      name,
      mobile,
      email,
      totalAmount: parseFloat(totalAmount),
      discount: parseFloat(discount),
      payableAmount: parseFloat(payableAmount)
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Add the booking to the user's bookings
    user.bookings.push(savedBooking._id);
    await user.save();

    // Respond with the newly created booking
    res.status(201).json({ message: 'Booking successful', booking: savedBooking });
   } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});

module.exports = router;
