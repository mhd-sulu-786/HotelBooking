const mongoose = require('mongoose');

const hotelCollectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const HotelCollection = mongoose.model('HotelCollection', hotelCollectionSchema);

module.exports = HotelCollection;
