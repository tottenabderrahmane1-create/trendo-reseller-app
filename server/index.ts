import express, { Request, Response } from 'express';
import { mockOrders, mockProducts } from './mock-data';

const app = express();
app.use(express.json());

const stripeSecret = process.env.STRIPE_SECRET_KEY ?? '';
const isMockMode = /mock/i.test(stripeSecret);

app.get('/api/products', (_req: Request, res: Response) => {
  if (isMockMode) {
    return res.json(mockProducts);
  }

  return res.status(501).json({ error: 'Products service not configured.' });
});

app.get('/api/admin/orders', (_req: Request, res: Response) => {
  if (isMockMode) {
    return res.json(mockOrders);
  }

  return res.status(501).json({ error: 'Admin orders service not configured.' });
});

app.get('/api/orders/:id', (req: Request<{ id: string }>, res: Response) => {
  if (isMockMode && req.params.id === 'demo-order-123') {
    return res.json({
      id: 'demo-order-123',
      items: [
        { id: 'item-1', name: 'Demo Smart Watch', quantity: 1, price: 49.99 },
        { id: 'item-2', name: 'Demo Earbuds', quantity: 2, price: 20.0 }
      ],
      total: 89.99,
      estimatedDelivery: '5-7 business days'
    });
  }

  return res.status(404).json({ error: 'Order not found.' });
});

app.post('/api/checkout/create-payment-intent', (_req: Request, res: Response) => {
  if (isMockMode) {
    return res.json({ clientSecret: 'mock_secret', orderId: 'demo-order-123' });
  }

  return res.status(501).json({ error: 'Checkout service not configured.' });
});

const port = Number(process.env.PORT ?? '3001');
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
