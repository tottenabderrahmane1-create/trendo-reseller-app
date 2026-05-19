# TRENDO

## About
TRENDO is a premium dropshipping storefront focused on curated trending products with a modern shopping experience.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Express
- Stripe
- Framer Motion
- Zustand

## Setup
1. Install dependencies:
   - `npm install`
2. Copy environment template:
   - `cp .env.example .env`
3. Fill in your Stripe and admin credentials in `.env`.
4. Start frontend:
   - `npm run dev`
5. Start backend:
   - `node server/index.ts`

## Routes
### Frontend
- `/` — Home
- `/products` — Product listing
- `/products/:id` — Product detail
- `/cart` — Cart
- `/checkout` — Checkout
- `/order-confirmed` — Order confirmation
- `/admin` — Admin dashboard
- `/legal/suppliers` — Supplier attribution

### Backend
- `GET /api/products`
- `POST /api/orders`
- `GET /api/orders/:id`
- `GET /api/admin/orders`
- `POST /api/stripe/create-payment-intent`
- `POST /api/checkout/complete`

## Admin
Visit `/admin` and enter `ADMIN_TOKEN` to access the admin dashboard.
