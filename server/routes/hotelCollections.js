const express = require('express');
const router = express.Router();
const HotelCollection = require('../models/HotelCollection');

// GET all hotel collections
router.get('/', async (req, res) => {
    try {
        const collections = await HotelCollection.find();
        res.json(collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new hotel collection
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newCollection = new HotelCollection({ name });
        await newCollection.save();
        res.status(201).json(newCollection);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a hotel collection by ID
router.delete('/:id', async (req, res) => {
    try {
        const collection = await HotelCollection.findByIdAndDelete(req.params.id);
        if (!collection) return res.status(404).json({ message: 'Collection not found' });
        res.json({ message: 'Collection deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
