const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
    
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Hotel'
  },
  hotelName: {
    type: String,
    required: true
  },
  hotelImage: {
    type: String,
    required: true
  },
  hotelPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cart', cartSchema);
