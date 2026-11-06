const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, default: '' },
  comment: { type: String, default: '' },
  type: { type: String, enum: ['text', 'video'], default: 'text' },
  image: { type: String, default: '' },
  mediaUrl: { type: String, default: '' },
  product: { type: String, default: '' },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
