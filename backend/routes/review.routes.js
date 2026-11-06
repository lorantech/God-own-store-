const express = require('express');
const Review = require('../models/Review');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { approved, admin } = req.query;
    const filter = {};
    if (admin === 'true') {
      if (approved === 'true') filter.approved = true;
      if (approved === 'false') filter.approved = false;
    } else {
      filter.approved = true;
    }
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, rating, comment, title, handle, image, mediaUrl, type, product } = req.body;
    if (!name || !rating) return res.status(400).json({ message: 'Name and rating are required' });
    const r = Number(rating);
    if (Number.isNaN(r) || r < 1 || r > 5) return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    const review = new Review({
      name: String(name).trim(),
      rating: r,
      comment: comment || '',
      title: title || '',
      handle: handle || '',
      image: image || '',
      mediaUrl: mediaUrl || '',
      type: type === 'video' ? 'video' : 'text',
      product: product || '',
      approved: false,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.post('/admin', authMiddleware, async (req, res, next) => {
  try {
    const { name, rating } = req.body;
    if (!name || rating === undefined) return res.status(400).json({ message: 'Name and rating are required' });
    const review = new Review({
      ...req.body,
      rating: Number(req.body.rating),
      approved: req.body.approved === true,
      type: req.body.type === 'video' ? 'video' : 'text',
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (update.rating !== undefined) update.rating = Number(update.rating);
    if (update.type !== undefined) update.type = update.type === 'video' ? 'video' : 'text';
    const review = await Review.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: false });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/approve', authMiddleware, async (req, res, next) => {
  try {
    const approved = req.body && req.body.approved === false ? false : true;
    const review = await Review.findByIdAndUpdate(req.params.id, { approved }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
