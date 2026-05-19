import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const router = Router();

type OrderItem = { productId: string; qty: number; variant?: string };

type OrderPayload = {
  items: OrderItem[];
  shippingAddress: { name: string; line1: string; city: string; country: string; zip: string };
  email: string;
};

const baseOrder = (total: number) => ({
  orderId: uuid(),
  status: 'processing',
  total,
  estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
});

router.post('/api/orders', (req, res) => {
  const body = req.body as OrderPayload;
  const total = (body.items ?? []).reduce((sum, item) => sum + item.qty * 25, 0);
  res.status(201).json(baseOrder(Number(total.toFixed(2))));
});

router.get('/api/orders/:id', (_req, res) => {
  res.json(baseOrder(150));
});

export default router;
