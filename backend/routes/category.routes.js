const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { name, description, image } = req.body;
    if (!name || !String(name).trim()) return res.status(400).json({ message: 'Category name is required' });
    const existing = await Category.findOne({ name: String(name).trim() });
    if (existing) return res.status(409).json({ message: 'Category already exists' });
    const category = await Category.create({ name: String(name).trim(), description: description || '', image: image || '' });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const nextName = req.body.name !== undefined ? String(req.body.name).trim() : category.name;
    if (!nextName) return res.status(400).json({ message: 'Category name is required' });
    if (nextName !== category.name) {
      const dup = await Category.findOne({ name: nextName, _id: { $ne: category._id } });
      if (dup) return res.status(409).json({ message: 'Category already exists' });
      await Product.updateMany({ category: category.name }, { category: nextName });
    }
    category.name = nextName;
    if (req.body.description !== undefined) category.description = req.body.description || '';
    if (req.body.image !== undefined) category.image = req.body.image || '';
    await category.save();
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const count = await Product.countDocuments({ category: category.name });
    if (count > 0) return res.status(400).json({ message: `Cannot delete: ${count} product(s) still assigned to this category. Reassign them first.` });
    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;