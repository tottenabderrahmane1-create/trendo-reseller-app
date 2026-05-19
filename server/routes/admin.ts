import { Router } from 'express';

import { adminAuth } from '../middleware/auth';

const router = Router();

router.get('/api/admin/orders', adminAuth, (_req, res) => {
  const orders = [
    {
      orderId: 'ord_101',
      status: 'processing',
      items: [
        { productId: 'prd_001', qty: 1, dhgatePrice: 49.99, trendoPrice: 53.99 },
        { productId: 'prd_007', qty: 2, dhgatePrice: 11.35, trendoPrice: 12.26 },
      ],
    },
    {
      orderId: 'ord_102',
      status: 'processing',
      items: [{ productId: 'prd_010', qty: 1, dhgatePrice: 18.6, trendoPrice: 20.09 }],
    },
  ].map((order) => ({
    ...order,
    profit: Number(
      order.items
        .reduce((sum, item) => sum + (item.trendoPrice - item.dhgatePrice) * item.qty, 0)
        .toFixed(2),
    ),
  }));

  res.json(orders);
});

export default router;
