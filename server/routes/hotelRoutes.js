// server/routes/hotelRoutes.js

const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Route to add a new hotel
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const hotelData = req.body;
    hotelData.images = req.files ? req.files.map(file => file.filename) : [];

    const newHotel = new Hotel(hotelData);
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error('Error adding hotel:', error);
    res.status(500).json({ message: 'Failed to add hotel' });
  }
});

// Route to get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
});

// Route to get all hotels
router.get('/', async (req, res) => {
  try {
    const { query, city, state } = req.query;

    // Build the filter object
    let filter = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }
    if (city) {
      filter.city = city;
    }
    if (state) {
      filter.state = state;
    }

    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Failed to fetch hotels' });
  }
});

// Route to get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    res.status(500).json({ message: 'Failed to fetch hotel details' });
  }
});



router.put('/:id', upload.array('images'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.files) {
      updateData.images = req.files.map(file => file.filename);
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    res.json(updatedHotel);
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'Failed to update hotel' });
  }
});

// Assuming you have a route for hotels in your Express server
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await Hotel.findByIdAndDelete(id);

      if (!result) {
          return res.status(404).json({ message: 'Hotel not found' });
      }

      res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
      console.error('Error deleting hotel:', error);
      res.status(500).json({ message: 'Failed to delete hotel' });
  }
});

module.exports = router;
