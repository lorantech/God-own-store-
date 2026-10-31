const mongoose = require('mongoose');

const CEOCornerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  quote: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CEOCorner', CEOCornerSchema);
