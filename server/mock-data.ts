export type MockOrder = {
  id: string;
  customer: string;
  items: number;
  total: number;
  profit: number;
  createdAt: string;
};

export type MockProduct = {
  id: string;
  name: string;
  price: number;
  trendoPrice: number;
  category: string;
  rating: number;
  imageUrl: string;
};

export const mockOrders: MockOrder[] = [
  { id: 'ord-101', customer: 'Alex Morgan', items: 2, total: 89.99, profit: 18.0, createdAt: '2026-05-17T10:15:00Z' },
  { id: 'ord-102', customer: 'Jamie Lee', items: 1, total: 42.5, profit: 9.4, createdAt: '2026-05-17T14:22:00Z' },
  { id: 'ord-103', customer: 'Taylor Kim', items: 3, total: 134.0, profit: 29.8, createdAt: '2026-05-18T09:05:00Z' },
  { id: 'ord-104', customer: 'Riley Chen', items: 4, total: 210.75, profit: 45.1, createdAt: '2026-05-18T17:40:00Z' },
  { id: 'ord-105', customer: 'Jordan Patel', items: 2, total: 67.25, profit: 13.9, createdAt: '2026-05-19T08:12:00Z' }
];

export const mockProducts: MockProduct[] = [
  { id: 'prd-1', name: 'Magnetic Phone Mount', price: 24.99, trendoPrice: 19.99, category: 'Accessories', rating: 4.6, imageUrl: 'https://picsum.photos/seed/trendo1/600/400' },
  { id: 'prd-2', name: 'Portable Blender Cup', price: 39.99, trendoPrice: 31.99, category: 'Kitchen', rating: 4.5, imageUrl: 'https://picsum.photos/seed/trendo2/600/400' },
  { id: 'prd-3', name: 'Mini Projector', price: 79.99, trendoPrice: 64.99, category: 'Electronics', rating: 4.3, imageUrl: 'https://picsum.photos/seed/trendo3/600/400' },
  { id: 'prd-4', name: 'Posture Corrector', price: 29.99, trendoPrice: 22.49, category: 'Health', rating: 4.2, imageUrl: 'https://picsum.photos/seed/trendo4/600/400' },
  { id: 'prd-5', name: 'LED Desk Lamp', price: 34.99, trendoPrice: 26.99, category: 'Home', rating: 4.7, imageUrl: 'https://picsum.photos/seed/trendo5/600/400' },
  { id: 'prd-6', name: 'Travel Cable Organizer', price: 18.99, trendoPrice: 13.99, category: 'Travel', rating: 4.4, imageUrl: 'https://picsum.photos/seed/trendo6/600/400' }
];
