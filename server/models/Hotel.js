const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flatno: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    categories: [String],
    facilities: [String],
    collections: [String],
    amenities: [String],
    city: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Hotel', hotelSchema);
