const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'default-icon', // Provide a default value
  },
});

module.exports = mongoose.model('Amenity', amenitySchema);
