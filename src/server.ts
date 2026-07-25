// SnapOG — Node.js entry point
// Starts the Hono HTTP server via @hono/node-server

import { serve } from '@hono/node-server';
import app from './index';

const port = Number(process.env.PORT) || 3000;

console.log(`SnapOG starting on http://0.0.0.0:${port}`);
serve({ fetch: app.fetch, port });
