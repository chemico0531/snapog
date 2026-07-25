// SnapOG — OG image renderer
// Uses satori + @resvg/resvg-js (Node.js native, no Cloudflare dependency)

import { readFileSync } from 'fs';
import { join } from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { buildElement } from './templates';
import type { OGParams } from '../types';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// ── Fonts (loaded once at module init) ───────────────────────────────────────

const FONTS_DIR = join(__dirname, '..', '..', 'fonts');

const fonts = [
  {
    name: 'Noto Sans',
    data: readFileSync(join(FONTS_DIR, 'NotoSans-Regular.woff')),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Sans',
    data: readFileSync(join(FONTS_DIR, 'NotoSans-Bold.woff')),
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Serif',
    data: readFileSync(join(FONTS_DIR, 'NotoSerif-Regular.woff')),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Serif',
    data: readFileSync(join(FONTS_DIR, 'NotoSerif-Bold.woff')),
    weight: 700 as const,
    style: 'normal' as const,
  },
];

// ── Image generation ────────────────────────────────────────────────────────

export async function generateOGImage(
  params: OGParams,
  watermark: boolean
): Promise<Response> {
  const element = buildElement(params, watermark);

  const svg = await satori(element, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts,
  });

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
}

// Build a deterministic cache key from OG params
export async function buildCacheKey(
  params: OGParams,
  watermark: boolean
): Promise<string> {
  const sorted = JSON.stringify(
    Object.fromEntries(
      Object.entries({ ...params, watermark }).sort(([a], [b]) =>
        a.localeCompare(b)
      )
    )
  );
  const encoder = new TextEncoder();
  const data = encoder.encode(sorted);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
