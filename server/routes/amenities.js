const express = require('express');
const router = express.Router();
const Amenity = require('../models/Amenity');

// Get all amenities
router.get('/', async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (err) {
    console.error('Error fetching amenities:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create new amenities
router.post('/', async (req, res) => {
  try {
    const { amenities } = req.body;
    if (!amenities || !Array.isArray(amenities)) {
      return res.status(400).json({ message: 'Amenities must be an array' });
    }
    // Validate that each amenity has both name and icon
    const newAmenities = amenities.map(amenity => ({
      name: amenity.name,
      icon: amenity.icon || 'default-icon', // Provide a default if icon is missing
    }));
    const savedAmenities = await Amenity.insertMany(newAmenities);
    res.status(201).json({ message: 'Amenities saved successfully', savedAmenities });
  } catch (error) {
    console.error('Error saving amenities:', error);
    res.status(500).json({ message: 'Error saving amenities', error });
  }
});

// Delete selected amenities
router.delete('/', async (req, res) => {
  try {
    const { amenities } = req.body;
    if (!amenities || !Array.isArray(amenities)) {
      return res.status(400).json({ message: 'Amenities must be an array' });
    }
    await Amenity.deleteMany({ name: { $in: amenities } });
    res.status(200).json({ message: 'Amenities deleted successfully' });
  } catch (error) {
    console.error('Error deleting amenities:', error);
    res.status(500).json({ message: 'Error deleting amenities', error });
  }
});

module.exports = router;
