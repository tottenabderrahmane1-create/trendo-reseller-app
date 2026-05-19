import { Router } from 'express';
import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';

import { calculateMarkup } from '../utils/markup';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2025-04-30.basil',
});

const products = [
  { id: 'prd_001', dhgatePrice: 49.99 },
  { id: 'prd_002', dhgatePrice: 79.5 },
  { id: 'prd_003', dhgatePrice: 29.99 },
  { id: 'prd_004', dhgatePrice: 14.25 },
  { id: 'prd_005', dhgatePrice: 33.4 },
  { id: 'prd_006', dhgatePrice: 27.89 },
  { id: 'prd_007', dhgatePrice: 11.35 },
  { id: 'prd_008', dhgatePrice: 16.75 },
  { id: 'prd_009', dhgatePrice: 9.95 },
  { id: 'prd_010', dhgatePrice: 18.6 },
  { id: 'prd_011', dhgatePrice: 21.45 },
  { id: 'prd_012', dhgatePrice: 24.1 },
].map((item) => ({ ...item, trendoPrice: calculateMarkup(item.dhgatePrice) }));

const orders: Array<{
  id: string;
  paymentIntentId: string;
  items: Array<{ productId: string; qty: number; variantSize?: string }>;
  shippingAddress: { name: string; address1: string; city: string; country: string; postalCode: string };
  profit: number;
  status: 'paid';
  createdAt: string;
}> = [];

router.post('/api/checkout/complete', async (req, res) => {
  try {
    const { paymentIntentId, shippingAddress, items } = req.body as {
      paymentIntentId: string;
      shippingAddress: { name: string; address1: string; city: string; country: string; postalCode: string };
      items: Array<{ productId: string; qty: number; variantSize?: string }>;
    };

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({ error: 'Payment not completed' });
      return;
    }

    const profit = Number(
      items
        .reduce((sum, item) => {
          const product = products.find((productRow) => productRow.id === item.productId);
          if (!product) return sum;
          return sum + (product.trendoPrice - product.dhgatePrice) * item.qty;
        }, 0)
        .toFixed(2),
    );

    const order = {
      id: uuid(),
      paymentIntentId,
      items,
      shippingAddress,
      profit,
      status: 'paid' as const,
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    res.json({ orderId: order.id, status: order.status });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Checkout completion failed' });
  }
});

export default router;
