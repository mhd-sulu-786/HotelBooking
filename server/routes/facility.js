const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// GET all facilities
router.get('/', async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new facility
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newFacility = new Facility({ name });
        await newFacility.save();
        res.status(201).json(newFacility);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a facility by ID
router.delete('/:id', async (req, res) => {
    try {
        const facility = await Facility.findByIdAndDelete(req.params.id);
        if (!facility) return res.status(404).json({ message: 'Facility not found' });
        res.json({ message: 'Facility deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
