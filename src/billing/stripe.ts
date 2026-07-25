// SnapOG — Stripe client
// Creates checkout sessions for Pro ($19/mo) and Business ($49/mo)
// All monetary values in cents (USD)

export interface StripePrice {
  tier: 'pro' | 'business';
  priceId: string;       // Stripe Price ID from dashboard
  amount: number;        // monthly, in cents
  label: string;         // human label
}

// Configured via env vars in production; hardcoded defaults for dev
export const PRICES: Record<string, StripePrice> = {
  pro: {
    tier: 'pro',
    priceId: '',  // Set via STRIPE_PRO_PRICE_ID env var
    amount: 1900,
    label: 'Pro — $19/month',
  },
  business: {
    tier: 'business',
    priceId: '',  // Set via STRIPE_BUSINESS_PRICE_ID env var
    amount: 4900,
    label: 'Business — $49/month',
  },
};

/**
 * Create a Stripe Checkout Session.
 *
 * Uses the Stripe REST API directly (fetch) so we don't need the full
 * stripe-node SDK at runtime in Workers.  stripe-node pulls in 600+ KB
 * of unused code; the REST API is ~20 lines.
 */
export async function createCheckoutSession(params: {
  priceId: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
  apiKey: string;
}): Promise<{ url: string; sessionId: string } | { error: string }> {
  const body = new URLSearchParams({
    'line_items[0][price]': params.priceId,
    'line_items[0][quantity]': '1',
    mode: 'subscription',
    'customer_email': params.customerEmail,
    'success_url': params.successUrl,
    'cancel_url': params.cancelUrl,
    'metadata[product]': 'snapog',
  });

  try {
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const data = await resp.json() as Record<string, unknown>;

    if (!resp.ok) {
      console.error('Stripe error:', JSON.stringify(data));
      return { error: (data.error as Record<string, string>)?.message ?? 'Stripe API error' };
    }

    return {
      url: data.url as string,
      sessionId: data.id as string,
    };
  } catch (err) {
    console.error('Stripe fetch error:', err);
    return { error: 'Failed to connect to Stripe' };
  }
}

/**
 * Verify a Stripe webhook signature.
 * Uses Stripe's recommended constant-time comparison pattern.
 */
export async function verifyWebhookSignature(params: {
  payload: string;
  signature: string;
  secret: string;
}): Promise<boolean> {
  // stripe-signature header format: t=timestamp,v1=signature
  const parts = params.signature.split(',').reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split('=');
    if (k && v) acc[k] = v;
    return acc;
  }, {});

  const timestamp = parts['t'];
  const sig = parts['v1'];

  if (!timestamp || !sig) return false;

  // Reject events older than 5 minutes (replay protection)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > 300) {
    console.warn('Stripe webhook: timestamp outside tolerance window');
    return false;
  }

  const signedPayload = `${timestamp}.${params.payload}`;

  // HMAC-SHA256 verification
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(params.secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigBytes = hexToBytes(sig);
  return crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes as BufferSource,
    encoder.encode(signedPayload)
  );
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
