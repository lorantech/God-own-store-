const mongoose = require('mongoose');

const CEOCornerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  quote: { type: String, default: '' },
  fullName: { type: String, default: '' },
  position: { type: String, default: 'Founder & CEO' },
  welcomeMessage: { type: String, default: '' },
  introduction: { type: String, default: '' },
  story: { type: String, default: '' },
  vision: { type: String, default: '' },
  mission: { type: String, default: '' },
  personalMessage: { type: String, default: '' },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('CEOCorner', CEOCornerSchema);
