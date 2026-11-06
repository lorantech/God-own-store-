require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth.routes');
const productRoutes = require('../routes/product.routes');
const categoryRoutes = require('../routes/category.routes');
const reviewRoutes = require('../routes/review.routes');
const ceoCornerRoutes = require('../routes/ceoCorner.routes');
const settingsRoutes = require('../routes/settings.routes');

const app = express();

app.use(
  cors({
    origin(origin, cb) {
      const allowed = (process.env.FRONTEND_URL || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (!origin) return cb(null, true); // server-to-server, curl, same-origin
      if (!allowed.length || allowed.includes(origin)) return cb(null, true);
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return cb(null, true);
      if (/\.vercel\.app$/.test(new URL(origin).hostname)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'gods-own-store-api', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/ceo-corner', ceoCornerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/*', (req, res) => res.status(404).json({ message: `API route not found: ${req.method} ${req.originalUrl}` }));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});
const handler = serverless(app);

// Export the raw Express app for testing / custom server usage
module.exports = handler;
module.exports.app = app;

// Start a real HTTP server when run directly (local dev).
// On Vercel / serverless platforms the exported handler above is used instead.
if (require.main === module) {
  const PORT = Number(process.env.PORT) || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  });
}
