const express = require('express');
const CEOCorner = require('../models/CEOCorner');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const ceoCorner = await CEOCorner.findOne().sort({ createdAt: -1 });
    res.json(ceoCorner);
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    await CEOCorner.deleteMany({});
    const ceoCorner = new CEOCorner(req.body);
    await ceoCorner.save();
    res.status(201).json(ceoCorner);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
