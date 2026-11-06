const mongoose = require('mongoose');
const Product = require('./models/Product');
const { juneImagesByCategory } = require('./lib/juneProductImages');
require('dotenv').config();

const categories = [
  'Necklaces & Pendants',
  'Rings',
  'Bracelets & Bangles',
  'Earrings & Sets',
  'Watches',
  'Customised Jewelry',
];

const names = {
  'Necklaces & Pendants': ['Dainty Layered Necklace', 'Zirconia Pendant Set', 'Classic Gold Necklace'],
  'Rings': ['Elegant Statement Ring', 'Stackable Band Ring', 'Crystal Accent Ring'],
  'Bracelets & Bangles': ['Chunky Bangle Set', 'Charm Bracelet', 'Minimal Cuff Bracelet'],
  'Earrings & Sets': ['Drop Earring Set', 'Stud & Hoop Combo', 'Classic Earring Pair'],
  'Watches': ['Luxury Fashion Watch', 'Classic Wrist Watch', 'Modern Strap Watch'],
  'Customised Jewelry': ['Custom Name Piece', 'Personalised Gift Set', 'Bespoke Jewelry Design'],
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    let created = 0;
    for (const category of categories) {
      const imgs = juneImagesByCategory[category] || [];
      for (let i = 0; i < Math.min(2, (names[category] || []).length); i++) {
        const name = names[category][i];
        const exists = await Product.findOne({ name, category });
        if (exists) continue;
        await Product.create({
          name,
          description: `Premium ${category.toLowerCase()} piece curated for GODS OWN STORE. Images sourced for catalog display.`,
          price: 15000 + i * 7500 + categories.indexOf(category) * 2000,
          category,
          images: imgs[i] ? [imgs[i]] : imgs[0] ? [imgs[0]] : [],
          featured: i === 0,
          inStock: true,
        });
        created++;
      }
    }
    console.log(`Seeded ${created} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedProducts();
