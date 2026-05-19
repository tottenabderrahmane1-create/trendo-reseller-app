import cors from 'cors';
import express from 'express';

import adminRoutes from './routes/admin';
import checkoutRoutes from './routes/checkout';
import orderRoutes from './routes/orders';
import productRoutes from './routes/products';
import stripeRoutes from './routes/stripe';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoutes);
app.use(orderRoutes);
app.use(stripeRoutes);
app.use(checkoutRoutes);
app.use(adminRoutes);

const PORT = Number(process.env.PORT ?? 3001);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`TRENDO API listening on port ${PORT}`);
  });
}

export default app;
