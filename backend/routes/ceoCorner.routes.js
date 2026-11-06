const express = require('express');
const CEOCorner = require('../models/CEOCorner');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { published: { $ne: false } };
    const ceoCorner = await CEOCorner.findOne(filter).sort({ createdAt: -1 });
    res.json(ceoCorner);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const existing = await CEOCorner.findOne().sort({ createdAt: -1 });
    const payload = { ...req.body };
    if (!payload.title) payload.title = payload.fullName ? `${payload.fullName} - CEO Corner` : 'CEO Corner';
    if (!payload.content) payload.content = payload.introduction || payload.welcomeMessage || 'Welcome to GODS OWN STORE.';
    let ceoCorner;
    if (existing) {
      Object.assign(existing, payload);
      ceoCorner = await existing.save();
    } else {
      ceoCorner = await new CEOCorner(payload).save();
    }
    res.json(ceoCorner);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
