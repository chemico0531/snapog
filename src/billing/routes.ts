// SnapOG — Billing routes
// /create-checkout-session  POST  → redirect to Stripe Checkout
// /billing/success          GET   → post-payment confirmation
// /stripe-webhook           POST  → Stripe event handler

import { Hono } from 'hono';
import { createCheckoutSession, verifyWebhookSignature, PRICES } from './stripe';
import { db } from '../db';
import type { Env, Tier } from '../types';
import { successPage, cancelPage } from '../dashboard/pages';

export const billing = new Hono<{ Bindings: Env }>();

// ── Create Checkout Session ─────────────────────────────────────────────────
billing.post('/create-checkout-session', async (c) => {
  const apiKey = c.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return c.json({ error: 'Stripe is not configured' }, 500);
  }

  let email: string, tier: string;
  try {
    const form = await c.req.formData();
    email = ((form.get('email') as string) ?? '').trim().toLowerCase();
    tier = ((form.get('tier') as string) ?? '').trim();
  } catch {
    return c.json({ error: 'Invalid form data' }, 400);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Valid email is required' }, 400);
  }

  const validTiers: Tier[] = ['pro', 'business'];
  if (!validTiers.includes(tier as Tier)) {
    return c.json({ error: 'Invalid tier. Choose pro or business.' }, 400);
  }

  const price = PRICES[tier];
  const priceId =
    c.env[
      tier === 'pro' ? 'STRIPE_PRO_PRICE_ID' : 'STRIPE_BUSINESS_PRICE_ID'
    ] || price.priceId;

  if (!priceId) {
    return c.json(
      { error: `Stripe Price ID not configured for ${tier} tier` },
      500
    );
  }

  const host = new URL(c.req.url).origin;
  const result = await createCheckoutSession({
    priceId,
    customerEmail: email,
    successUrl: `${host}/billing/success?tier=${tier}`,
    cancelUrl: `${host}/billing/cancel?tier=${tier}`,
    apiKey,
  });

  if ('error' in result) {
    return c.json({ error: result.error }, 502);
  }

  return c.redirect(result.url, 303);
});

// ── Success Page ────────────────────────────────────────────────────────────
billing.get('/billing/success', (c) => {
  const tier = c.req.query('tier') ?? 'pro';
  return c.html(successPage(tier));
});

// ── Cancel Page ─────────────────────────────────────────────────────────────
billing.get('/billing/cancel', (c) => {
  const tier = c.req.query('tier') ?? 'pro';
  return c.html(cancelPage(tier));
});

// ── Stripe Webhook ──────────────────────────────────────────────────────────
billing.post('/stripe-webhook', async (c) => {
  const webhookSecret = c.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return c.json({ error: 'Webhook secret not configured' }, 500);
  }

  const signature = c.req.header('stripe-signature');
  if (!signature) {
    return c.json({ error: 'Missing stripe-signature header' }, 400);
  }

  const payload = await c.req.text();

  const valid = await verifyWebhookSignature({
    payload,
    signature,
    secret: webhookSecret,
  });
  if (!valid) {
    return c.json({ error: 'Invalid signature' }, 401);
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(payload);
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400);
  }

  console.log(`Stripe webhook: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const customerEmail = session.customer_email as string | undefined;
      const subscriptionId = session.subscription as string | undefined;
      const metadata = session.metadata as Record<string, string> | undefined;
      const tier = metadata?.tier as Tier | undefined;

      if (!customerEmail || !subscriptionId) {
        console.warn('Webhook: missing email or subscription ID');
        break;
      }

      // Find user by email, upsert
      const userId = crypto.randomUUID();
      db.run(
        'INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT(email) DO NOTHING',
        userId,
        customerEmail
      );

      const user = db.get<{ id: string }>(
        'SELECT id FROM users WHERE email = ?',
        customerEmail
      );

      if (!user) {
        console.error('Webhook: user lookup failed after upsert');
        break;
      }

      // Create or update subscription record
      const subId = crypto.randomUUID();
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

      db.run(
        `INSERT INTO subscriptions
           (id, user_id, stripe_subscription_id, stripe_customer_email,
            tier, status, current_period_end)
         VALUES (?, ?, ?, ?, ?, 'active', ?)
         ON CONFLICT(stripe_subscription_id) DO UPDATE SET
           status = 'active',
           tier = ?,
           current_period_end = ?`,
        subId,
        user.id,
        subscriptionId,
        customerEmail,
        tier ?? 'pro',
        currentPeriodEnd.toISOString(),
        tier ?? 'pro',
        currentPeriodEnd.toISOString()
      );

      // If user already has an API key, upgrade it
      const existingKey = db.get<{ id: string; tier: string }>(
        'SELECT id, tier FROM api_keys WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
        user.id
      );

      if (existingKey && existingKey.tier !== (tier ?? 'pro')) {
        const limits: Record<string, number> = {
          pro: 10_000,
          business: 100_000,
        };
        db.run(
          'UPDATE api_keys SET tier = ?, monthly_limit = ? WHERE id = ?',
          tier ?? 'pro',
          limits[tier ?? 'pro'] ?? 10_000,
          existingKey.id
        );
      }

      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const stripeSubId = subscription.id as string;

      db.run(
        "UPDATE subscriptions SET status = 'canceled' WHERE stripe_subscription_id = ?",
        stripeSubId
      );

      // Downgrade linked API keys to free
      const sub = db.get<{ user_id: string }>(
        'SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?',
        stripeSubId
      );

      if (sub) {
        db.run(
          'UPDATE api_keys SET tier = ?, monthly_limit = ? WHERE user_id = ?',
          'free',
          100,
          sub.user_id
        );
      }

      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const stripeSubId = subscription.id as string;
      const status = subscription.status as string;

      if (status === 'past_due' || status === 'unpaid') {
        db.run(
          'UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?',
          status,
          stripeSubId
        );
      }
      break;
    }

    default:
      // Ignore other events
      break;
  }

  return c.json({ received: true });
});
