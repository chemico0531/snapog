// SnapOG — D1 database layer (Cloudflare Workers)
// Replaces better-sqlite3 with D1 — same SQLite semantics, async API

import type { D1Database } from './types';

// ── Table creation (idempotent) ──────────────────────────────────────────────

const SCHEMA_SQL = [
  `CREATE TABLE IF NOT EXISTS users (
    id          TEXT PRIMARY KEY,
    email       TEXT UNIQUE NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS api_keys (
    id              TEXT PRIMARY KEY,
    user_id         TEXT NOT NULL,
    name            TEXT NOT NULL DEFAULT 'default',
    key_prefix      TEXT NOT NULL,
    key_hash        TEXT UNIQUE NOT NULL,
    tier            TEXT NOT NULL DEFAULT 'free',
    monthly_limit   INTEGER NOT NULL DEFAULT 100,
    usage_count     INTEGER NOT NULL DEFAULT 0,
    usage_reset_at  TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash)`,
  `CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id)`,
  `CREATE TABLE IF NOT EXISTS usage_events (
    id           TEXT PRIMARY KEY,
    api_key_id   TEXT NOT NULL,
    template     TEXT NOT NULL DEFAULT 'default',
    cache_hit    INTEGER NOT NULL DEFAULT 0,
    generated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (api_key_id) REFERENCES api_keys(id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_usage_key ON usage_events(api_key_id)`,
  `CREATE TABLE IF NOT EXISTS subscriptions (
    id                       TEXT PRIMARY KEY,
    user_id                  TEXT NOT NULL,
    stripe_subscription_id   TEXT UNIQUE NOT NULL,
    stripe_customer_email    TEXT NOT NULL,
    tier                     TEXT NOT NULL DEFAULT 'pro',
    status                   TEXT NOT NULL DEFAULT 'active',
    current_period_end       TEXT NOT NULL,
    created_at               TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id)`,
  `CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id)`,
];

// ── DB wrapper factory ───────────────────────────────────────────────────────

export interface DBApi {
  get<T = Record<string, unknown>>(sql: string, ...params: unknown[]): Promise<T | undefined>;
  run(sql: string, ...params: unknown[]): Promise<void>;
  all<T = Record<string, unknown>>(sql: string, ...params: unknown[]): Promise<T[]>;
  batch(statements: Array<{ sql: string; params: unknown[] }>): Promise<void>;
}

export function createDB(d1: D1Database): DBApi {
  // Run migrations on first invocation (idempotent — uses IF NOT EXISTS)
  let migrated = false;
  async function ensureMigrated() {
    if (migrated) return;
    const stmts = SCHEMA_SQL.map((sql) => d1.prepare(sql));
    await d1.batch(stmts);
    migrated = true;
  }

  return {
    async get<T = Record<string, unknown>>(sql: string, ...params: unknown[]): Promise<T | undefined> {
      await ensureMigrated();
      const row = await d1.prepare(sql).bind(...params).first<T | null>();
      return row ?? undefined;
    },

    async run(sql: string, ...params: unknown[]): Promise<void> {
      await ensureMigrated();
      await d1.prepare(sql).bind(...params).run();
    },

    async all<T = Record<string, unknown>>(sql: string, ...params: unknown[]): Promise<T[]> {
      await ensureMigrated();
      const result = await d1.prepare(sql).bind(...params).all<T>();
      return result.results ?? [];
    },

    async batch(statements: Array<{ sql: string; params: unknown[] }>): Promise<void> {
      await ensureMigrated();
      const prepared = statements.map((s) => d1.prepare(s.sql).bind(...s.params));
      await d1.batch(prepared);
    },
  };
}
