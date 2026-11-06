const mongoose = require('mongoose');
const Product = require('./models/Product');
const { categoryCatalog } = require('./lib/categoryCatalog');
require('dotenv').config();

const priceBase = {
  'Necklaces & Pendants': 18000,
  'Rings': 12000,
  'Bracelets & Bangles': 15000,
  'Earrings & Sets': 10000,
  'Watches': 35000,
  'Customised Jewelry': 25000,
};

const seedCatalog = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    let created = 0;
    for (const [category, variants] of Object.entries(categoryCatalog)) {
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        const name = `${v.name} (${v.color})`;
        const exists = await Product.findOne({ name, category });
        if (exists) {
          if (v.group && !exists.variantGroup) {
            exists.variantGroup = `${category}::${v.group}`;
            await exists.save();
          }
          continue;
        }
        await Product.create({
          name,
          description: `${v.color} ${category.toLowerCase()} — premium piece from GODS OWN STORE. Available in-store and via WhatsApp order.`,
          price: (priceBase[category] || 15000) + i * 2500,
          category,
          color: v.color,
          variantGroup: v.group ? `${category}::${v.group}` : '',
          images: [v.image],
          featured: i === 0,
          inStock: true,
        });
        created++;
      }
    }
    console.log(`Seeded ${created} category catalog products (different colors per category).`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedCatalog();
