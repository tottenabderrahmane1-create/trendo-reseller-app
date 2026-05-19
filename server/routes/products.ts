import { Router } from 'express';

import { calculateMarkup } from '../utils/markup';

const router = Router();

const products = [
  { id: 'prd_001', name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', dhgatePrice: 49.99, images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'], rating: 4.7, shippingDays: 6, inStock: true },
  { id: 'prd_002', name: 'Smart Watch Series 9', category: 'Electronics', dhgatePrice: 79.5, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30'], rating: 4.6, shippingDays: 7, inStock: true },
  { id: 'prd_003', name: 'Portable Bluetooth Speaker', category: 'Electronics', dhgatePrice: 29.99, images: ['https://images.unsplash.com/photo-1589003077984-894e133dabab'], rating: 4.5, shippingDays: 5, inStock: true },
  { id: 'prd_004', name: 'Silk Blend Scarf', category: 'Fashion', dhgatePrice: 14.25, images: ['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9'], rating: 4.4, shippingDays: 8, inStock: true },
  { id: 'prd_005', name: 'Classic Denim Jacket', category: 'Fashion', dhgatePrice: 33.4, images: ['https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef'], rating: 4.3, shippingDays: 9, inStock: true },
  { id: 'prd_006', name: 'Athleisure Jogger Set', category: 'Fashion', dhgatePrice: 27.89, images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f'], rating: 4.2, shippingDays: 6, inStock: true },
  { id: 'prd_007', name: 'Minimalist Leather Wallet', category: 'Accessories', dhgatePrice: 11.35, images: ['https://images.unsplash.com/photo-1517256064527-09c73fc73e38'], rating: 4.8, shippingDays: 5, inStock: true },
  { id: 'prd_008', name: 'Polarized Aviator Sunglasses', category: 'Accessories', dhgatePrice: 16.75, images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083'], rating: 4.5, shippingDays: 7, inStock: true },
  { id: 'prd_009', name: 'Stainless Steel Chain Bracelet', category: 'Accessories', dhgatePrice: 9.95, images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d'], rating: 4.1, shippingDays: 10, inStock: true },
  { id: 'prd_010', name: 'Ceramic Aroma Diffuser', category: 'Home', dhgatePrice: 18.6, images: ['https://images.unsplash.com/photo-1616046229478-9901c5536a45'], rating: 4.6, shippingDays: 7, inStock: true },
  { id: 'prd_011', name: 'Bamboo Kitchen Organizer Set', category: 'Home', dhgatePrice: 21.45, images: ['https://images.unsplash.com/photo-1600488995464-4f6f1c26f63f'], rating: 4.3, shippingDays: 8, inStock: true },
  { id: 'prd_012', name: 'Plush Throw Blanket', category: 'Home', dhgatePrice: 24.1, images: ['https://images.unsplash.com/photo-1616627454154-f7e5f15f7a7f'], rating: 4.7, shippingDays: 6, inStock: true },
].map((product) => ({
  ...product,
  trendoPrice: calculateMarkup(product.dhgatePrice),
}));

router.get('/api/products', (_req, res) => {
  res.json(products);
});

export default router;
