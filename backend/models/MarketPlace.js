const mongoose = require('mongoose');

const marketPlaceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [ 
        'Gear & Equipment','Books & Media','Electronics','Furniture','other'],
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Custom Size'],
    default: null,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        url: String,
        filename: String,
      }
    ],
    validate: [arrayLimit, 'You can upload up to 5 images'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Listing', marketPlaceSchema);
