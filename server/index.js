    // server/index.js
    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const path = require('path');
    const bodyParser = require('body-parser');
    const categoryRoutes = require('./routes/Categories');
    const facilityRoutes = require('./routes/facility');
    const hotelCollectionRoutes = require('./routes/hotelCollections');
    const amenityRoutes = require('./routes/amenities');
    const hotelRoutes = require('./routes/hotelRoutes');
    const cartRoutes = require('./routes/cartroutes');
    const bookingRoutes = require('./routes/booking');

    dotenv.config(); // Load environment variables from .env file

    const authRoutes = require('./routes/auth');

    const app = express();

    app.use(bodyParser.json());

    // Middleware
    app.use(express.json());

    const mongoURI = 'mongodb://localhost:27017/hotelbooking';

    // Configure CORS
    const corsOptions = {
        origin: 'http://localhost:3000', // Specify the exact origin
        credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
    };

    const db = mongoose.connection;
    app.use(cors(corsOptions));

    // Routes
    app.use('/auth', authRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/facilities', facilityRoutes);
    app.use('/collections', hotelCollectionRoutes); 
    app.use('/amenities', amenityRoutes); 
    app.use('/api/hotels', hotelRoutes);
    app.use('/api/cart', cartRoutes);    
    app.use('/api/book', bookingRoutes);
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error('MONGO_URI is not defined in the environment variables');
        process.exit(1); // Exit the process with an error code
    }

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('MongoDB connection error:', err);
    });

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
