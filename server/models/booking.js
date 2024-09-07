const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  hotelAddress: { type: String, required: true },
  hotelPrice: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rooms: [{ id: Number, guests: Number }],
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  discount: { type: Number, required: true },
  payableAmount: { type: Number, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
