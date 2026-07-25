// SnapOG — shared types

export type Tier = 'free' | 'pro' | 'business';

export const TIER_LIMITS: Record<Tier, number> = {
  free: 100,
  pro: 10_000,
  business: 100_000,
};

export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key_prefix: string;
  key_hash: string;
  tier: Tier;
  monthly_limit: number;
  usage_count: number;
  usage_reset_at: string;
  created_at: string;
}

export interface OGParams {
  title: string;
  description?: string;
  theme?: 'dark' | 'light';
  template?: 'default' | 'blog' | 'article';
  author?: string;
  domain?: string;
  tag?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_email: string;
  tier: Tier;
  status: 'active' | 'past_due' | 'unpaid' | 'canceled';
  current_period_end: string;
  created_at: string;
}

// ── Minimal D1 types (replaces @cloudflare/workers-types) ──────────────────

/** Result returned by D1 .run() and .batch() */
interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta?: Record<string, unknown>;
}

/** A prepared D1 statement */
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

/** D1 database binding — provided by Cloudflare Workers runtime */
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1Result>;
  dump(): Promise<ArrayBuffer>;
}

// ── Environment ──────────────────────────────────────────────────────────────

/** Cloudflare Workers environment bindings */
export interface Env {
  DB: D1Database;
  ENVIRONMENT?: string;
  AUTH_SECRET?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_PRO_PRICE_ID?: string;
  STRIPE_BUSINESS_PRICE_ID?: string;
}
