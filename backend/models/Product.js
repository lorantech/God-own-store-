const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Necklaces & Pendants', 'Rings', 'Bracelets & Bangles', 'Earrings & Sets', 'Watches', 'Customised Jewelry']
  },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
