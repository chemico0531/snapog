// SnapOG — Billing routes
// /create-checkout-session  POST  → redirect to Stripe Checkout
// /billing/success          GET   → post-payment confirmation
// /stripe-webhook           POST  → Stripe event handler

import { Hono } from 'hono';
import { createCheckoutSession, verifyWebhookSignature, PRICES } from './stripe';
import type { Env, Tier } from '../types';
import { successPage, cancelPage } from '../dashboard/pages';

export const billing = new Hono<{ Bindings: Env }>();

// ── Create Checkout Session ─────────────────────────────────────────────────
billing.post('/create-checkout-session', async c => {
  const apiKey = c.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    return c.json({ error: 'Stripe is not configured' }, 500);
  }

  let email: string, tier: string;
  try {
    const form = await c.req.formData();
    email = (form.get('email') as string ?? '').trim().toLowerCase();
    tier = (form.get('tier') as string ?? '').trim();
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
  const priceId = c.env[tier === 'pro' ? 'STRIPE_PRO_PRICE_ID' : 'STRIPE_BUSINESS_PRICE_ID']
    || price.priceId;

  if (!priceId) {
    return c.json({ error: `Stripe Price ID not configured for ${tier} tier` }, 500);
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
billing.get('/billing/success', c => {
  const tier = c.req.query('tier') ?? 'pro';
  return c.html(successPage(tier));
});

// ── Cancel Page ─────────────────────────────────────────────────────────────
billing.get('/billing/cancel', c => {
  const tier = c.req.query('tier') ?? 'pro';
  return c.html(cancelPage(tier));
});

// ── Stripe Webhook ──────────────────────────────────────────────────────────
billing.post('/stripe-webhook', async c => {
  const webhookSecret = c.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return c.json({ error: 'Webhook secret not configured' }, 500);
  }

  const signature = c.req.header('stripe-signature');
  if (!signature) {
    return c.json({ error: 'Missing stripe-signature header' }, 400);
  }

  const payload = await c.req.text();

  const valid = await verifyWebhookSignature({ payload, signature, secret: webhookSecret });
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
      await c.env.DB
        .prepare('INSERT INTO users (id, email) VALUES (?, ?) ON CONFLICT(email) DO NOTHING')
        .bind(userId, customerEmail)
        .run();

      const user = await c.env.DB
        .prepare('SELECT id FROM users WHERE email = ?')
        .bind(customerEmail)
        .first<{ id: string }>();

      if (!user) {
        console.error('Webhook: user lookup failed after upsert');
        break;
      }

      // Create or update subscription record
      const subId = crypto.randomUUID();
      const currentPeriodEnd = new Date();
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

      await c.env.DB
        .prepare(
          `INSERT INTO subscriptions
             (id, user_id, stripe_subscription_id, stripe_customer_email,
              tier, status, current_period_end)
           VALUES (?, ?, ?, ?, ?, 'active', ?)
           ON CONFLICT(stripe_subscription_id) DO UPDATE SET
             status = 'active',
             tier = ?,
             current_period_end = ?`
        )
        .bind(
          subId, user.id, subscriptionId, customerEmail,
          tier ?? 'pro', currentPeriodEnd.toISOString(),
          tier ?? 'pro', currentPeriodEnd.toISOString()
        )
        .run();

      // If user already has an API key, upgrade it. Otherwise, they'll get
      // the tier on their next key creation. We notify them to re-register.
      const existingKey = await c.env.DB
        .prepare('SELECT id, tier FROM api_keys WHERE user_id = ? ORDER BY created_at DESC LIMIT 1')
        .bind(user.id)
        .first<{ id: string; tier: string }>();

      if (existingKey && existingKey.tier !== (tier ?? 'pro')) {
        const TIER_LIMITS: Record<string, number> = { pro: 10_000, business: 100_000 };
        await c.env.DB
          .prepare('UPDATE api_keys SET tier = ?, monthly_limit = ? WHERE id = ?')
          .bind(tier ?? 'pro', TIER_LIMITS[tier ?? 'pro'] ?? 10_000, existingKey.id)
          .run();
      }

      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const stripeSubId = subscription.id as string;

      await c.env.DB
        .prepare(
          `UPDATE subscriptions SET status = 'canceled' WHERE stripe_subscription_id = ?`
        )
        .bind(stripeSubId)
        .run();

      // Downgrade linked API keys to free
      const sub = await c.env.DB
        .prepare('SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?')
        .bind(stripeSubId)
        .first<{ user_id: string }>();

      if (sub) {
        await c.env.DB
          .prepare('UPDATE api_keys SET tier = ?, monthly_limit = ? WHERE user_id = ?')
          .bind('free', 100, sub.user_id)
          .run();
      }

      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object;
      const stripeSubId = subscription.id as string;
      const status = subscription.status as string;

      if (status === 'past_due' || status === 'unpaid') {
        await c.env.DB
          .prepare(
            `UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?`
          )
          .bind(status, stripeSubId)
          .run();
      }
      break;
    }

    default:
      // Ignore other events
      break;
  }

  return c.json({ received: true });
});
