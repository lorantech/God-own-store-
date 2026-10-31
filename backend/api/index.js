const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth.routes');
const productRoutes = require('../routes/product.routes');
const reviewRoutes = require('../routes/review.routes');
const ceoCornerRoutes = require('../routes/ceoCorner.routes');
const settingsRoutes = require('../routes/settings.routes');

const app = express();
connectDB();
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ceo-corner', ceoCornerRoutes);
app.use('/api/settings', settingsRoutes);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
module.exports = serverless(app);
