// SnapOG — OG image renderer
// Uses satori + @resvg/resvg-wasm (Cloudflare Workers compatible)

import satori from 'satori';
import { Resvg } from '@resvg/resvg-wasm';
import { buildElement } from './templates';
import type { OGParams } from '../types';

// ── Fonts (bundled as binary Data modules via wrangler.toml rules) ──────────

import notoSansRegular from '../../fonts/NotoSans-Regular.woff';
import notoSansBold from '../../fonts/NotoSans-Bold.woff';
import notoSerifRegular from '../../fonts/NotoSerif-Regular.woff';
import notoSerifBold from '../../fonts/NotoSerif-Bold.woff';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const fonts = [
  {
    name: 'Noto Sans',
    data: notoSansRegular,
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Sans',
    data: notoSansBold,
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Serif',
    data: notoSerifRegular,
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Serif',
    data: notoSerifBold,
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

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
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
