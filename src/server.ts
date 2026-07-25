// SnapOG — Node.js entry point
// Starts the Hono HTTP server via @hono/node-server
// Bridges process.env into Hono's c.env bindings

import { serve } from '@hono/node-server';
import app from './index';

const port = Number(process.env.PORT) || 3000;

// Build env bindings from process.env (needed for Stripe routes)
const env = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRO_PRICE_ID: process.env.STRIPE_PRO_PRICE_ID,
  STRIPE_BUSINESS_PRICE_ID: process.env.STRIPE_BUSINESS_PRICE_ID,
  ENVIRONMENT: process.env.ENVIRONMENT || process.env.NODE_ENV || 'production',
  AUTH_SECRET: process.env.AUTH_SECRET,
};

console.log(`SnapOG starting on http://0.0.0.0:${port}`);

serve({
  fetch: (request) => app.fetch(request, env),
  port,
});
