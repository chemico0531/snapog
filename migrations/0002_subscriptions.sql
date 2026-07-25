-- SnapOG D1 Schema
-- Migration 0002: Stripe subscriptions

CREATE TABLE IF NOT EXISTS subscriptions (
  id                       TEXT PRIMARY KEY,
  user_id                  TEXT NOT NULL,
  stripe_subscription_id   TEXT UNIQUE NOT NULL,
  stripe_customer_email    TEXT NOT NULL,
  tier                     TEXT NOT NULL DEFAULT 'pro',   -- pro | business
  status                   TEXT NOT NULL DEFAULT 'active', -- active | past_due | unpaid | canceled
  current_period_end       TEXT NOT NULL,
  created_at               TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
