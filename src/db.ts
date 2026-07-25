// SnapOG — SQLite database layer (better-sqlite3)
// Replaces Cloudflare D1 with local SQLite for Node.js deployment

import Database from 'better-sqlite3';
import { mkdirSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';

const DB_PATH = process.env.DB_PATH || join(__dirname, '..', 'data', 'snapog.db');

// Ensure the data directory exists
mkdirSync(dirname(DB_PATH), { recursive: true });

const sqlite = new Database(DB_PATH);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

// ── Migration runner ──────────────────────────────────────────────────────────

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS _migrations (
    name TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const migrationsDir = join(__dirname, '..', 'migrations');
try {
  const files = readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const applied = sqlite.prepare(
      'SELECT name FROM _migrations WHERE name = ?'
    ).get(file) as { name: string } | undefined;

    if (!applied) {
      const sql = readFileSync(join(migrationsDir, file), 'utf-8');
      sqlite.exec(sql);
      sqlite.prepare('INSERT INTO _migrations (name) VALUES (?)').run(file);
      console.log(`  ✓ Migration applied: ${file}`);
    }
  }
} catch {
  // migrations directory not found — skip (production Dockerfile copies it separately)
  console.log('  (no migrations directory, skipping)');
}

// ── Public API ────────────────────────────────────────────────────────────────

export const db = {
  /** Fetch a single row, returns undefined if not found */
  get<T = Record<string, unknown>>(sql: string, ...params: unknown[]): T | undefined {
    return sqlite.prepare(sql).get(...params) as T | undefined;
  },

  /** Execute a statement that doesn't return rows (INSERT, UPDATE, DELETE) */
  run(sql: string, ...params: unknown[]): void {
    sqlite.prepare(sql).run(...params);
  },

  /** Fetch all matching rows */
  all<T = Record<string, unknown>>(sql: string, ...params: unknown[]): T[] {
    return sqlite.prepare(sql).all(...params) as T[];
  },

  /** Wrap multiple writes in a transaction */
  transaction<T>(fn: () => T): T {
    return sqlite.transaction(fn)();
  },
};
