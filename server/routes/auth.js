const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Register endpoint
router.post('/register', async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, Error: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword, isAdmin });
        const savedUser = await newUser.save();

        res.json({ success: true, user: savedUser });
    } catch (err) {
        res.status(400).json({ success: false, Error: err.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ loginStatus: false, Error: 'Email or password is wrong' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ loginStatus: false, Error: 'Invalid password' });

        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        res.status(200).json({ loginStatus: true, token, user });
    } catch (err) {
        res.status(400).json({ loginStatus: false, Error: err.message });
    }
});

// Update user admin status
router.put('/update/:userId', verifyToken, async (req, res) => {
    const { isAdmin } = req.body;
    const userId = req.params.userId;

    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: 'Unauthorized to update user' });

        const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin }, { new: true });

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        res.status(400).json({ success: false, Error: err.message });
    }
});

// Admin access check
router.get('/admin', verifyToken, (req, res) => {
    if (req.user.isAdmin) {
        res.json({ adminAccess: true });
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
});

// Get user info
router.get('/user', verifyToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
