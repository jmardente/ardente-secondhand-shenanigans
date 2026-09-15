const Stripe = require('stripe');

const CATALOG = new Map([
  ['cobalt-blue-art-glass-candle-holders', { name: 'Cobalt Blue Art Glass Candle Holders — Set of 3', price: 34.99 }],
  ['toshiba-tk05-toner-3-pack', { name: 'Toshiba Fax Toner Cartridge TK05 — Black — 3 Pack', price: 19.99 }],
  ['tolerant-liberal-metal-sign', { name: '“I’m a Tolerant Liberal!” Political Humor Metal Sign', price: 9.99 }],
  ['farm-market-rooster-15-inch', { name: 'Farm Market Rooster — 15-Inch Figurine', price: 69.99 }],
  ['charlie-chocolate-factory-1964', { name: 'Charlie and the Chocolate Factory', price: 349.99 }],
  ['tigers-curse-signed-first-edition', { name: "Tiger's Curse — Signed First Edition / First Printing", price: 49.99 }]
]);

const QUOTE_ONLY = new Set([
  'temp-tations-old-world-red-12-piece-set',
  'fisher-price-little-people-share-care-safari',
  'marcel-marceau-bip-lithographs',
  'claude-monet-garden-replica',
  'book-trails-8-volume-set',
  'african-game-trails-2-volume-set',
  'library-worlds-best-literature-46-volume',
  'colleen-houck-book-collection'
]);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed.' }) };
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Secure checkout is not connected on this site yet. Please request a shipping quote.');
    }

    const shippingRateId = process.env.SECONDHAND_STANDARD_SHIPPING_RATE || process.env.STRIPE_SHIPPING_RATE_STANDARD;
    if (!shippingRateId) {
      throw new Error('Standard shipping is not configured yet. Please request a shipping quote so we can give you the correct total.');
    }

    const { items = [] } = JSON.parse(event.body || '{}');
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Your cart is empty.');
    }

    const line_items = items.map(({ id, quantity }) => {
      if (QUOTE_ONLY.has(id)) {
        throw new Error('One of these items requires a custom shipping quote.');
      }

      const product = CATALOG.get(id);
      if (!product) {
        throw new Error('This item is not enabled for secure checkout yet. Please request a shipping quote.');
      }

      const normalizedQuantity = Math.max(1, Math.min(1, Number(quantity) || 1));
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: product.name },
          unit_amount: Math.round(product.price * 100)
        },
        quantity: normalizedQuantity
      };
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const siteUrl = process.env.URL || 'https://ardentesecondhandshop.com';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${siteUrl}/?checkout=success`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [{ shipping_rate: shippingRateId }],
      allow_promotion_codes: true
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (error) {
    return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
  }
};
