const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  category: { type: String, required: true },
  images: [{ type: String }],
  color: { type: String, default: '' },
  variantGroup: { type: String, default: '' },
  sizes: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
