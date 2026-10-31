const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  logo: { type: String },
  storeName: { type: String, default: 'GODS OWN STORE' },
  tagline: { type: String, default: 'Dealer in All Kind of Jewelries' },
  whatsapp: { type: String, default: '2347032835379' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
