// const mongoose = require('../db/conn');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // Update this to an array of ObjectIds
    
//     isAdmin: {
//         type: Boolean,
//         default: false
//     }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]  // Make sure this exists
});

const User = mongoose.model('User', userSchema);
module.exports = User;

