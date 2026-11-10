require('dotenv').config();

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = Number(process.env.GATEWAY_PORT || process.env.PORT || 3000);
const BACKEND_TARGET = (process.env.BACKEND_TARGET || 'http://localhost:5000').replace(/\/$/, '');
const FRONTEND_TARGET = (process.env.FRONTEND_TARGET || 'http://localhost:3001').replace(/\/$/, '');

app.get('/gateway/health', (req, res) => {
  res.json({
    ok: true,
    service: 'gods-own-store-gateway',
    backend: BACKEND_TARGET,
    frontend: FRONTEND_TARGET,
    time: new Date().toISOString(),
  });
});

const apiProxy = createProxyMiddleware({
  target: BACKEND_TARGET,
  changeOrigin: true,
  ws: false,
  pathFilter: '/api',
  proxyTimeout: 30000,
  timeout: 30000,
  on: {
    error(err, req, res) {
      const message = err?.message || 'Gateway error while reaching backend';
      console.error('[gateway] backend proxy error:', message);
      if (res && !res.headersSent && typeof res.status === 'function') {
        res.status(502).json({ message: 'Cannot reach backend service', detail: message });
      }
    },
  },
});

const frontendProxy = createProxyMiddleware({
  target: FRONTEND_TARGET,
  changeOrigin: true,
  ws: true,
  pathFilter: '/**',
  proxyTimeout: 30000,
  timeout: 30000,
  on: {
    error(err, req, res) {
      const message = err?.message || 'Gateway error while reaching frontend';
      console.error('[gateway] frontend proxy error:', message);
      if (res && !res.headersSent && typeof res.status === 'function') {
        res.status(502).send('Cannot reach frontend service');
      } else if (res && typeof res.end === 'function') {
        try { res.end(); } catch {}
      }
    },
  },
});

app.use(apiProxy);
app.use(frontendProxy);

const server = app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
  console.log(`  /api/* -> ${BACKEND_TARGET}`);
  console.log(`  /*     -> ${FRONTEND_TARGET}`);
});

server.on('upgrade', frontendProxy.upgrade);

module.exports = app;
