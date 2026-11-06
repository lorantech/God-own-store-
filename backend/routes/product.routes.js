const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { category, featured, group, admin } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (group) filter.variantGroup = group;
    if (admin !== 'true') filter.published = { $ne: false };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (req.query.admin !== 'true' && product.published === false) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
