import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  category: string;
  dhgatePrice: number;
  trendoPrice: number;
  images: string[];
  rating: number;
  shippingDays: number;
  inStock: boolean;
};

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product, qty = 1) => {
    const existing = get().items.find((item) => item.product.id === product.id);
    if (existing) {
      set((state) => ({
        items: state.items.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item,
        ),
      }));
      return;
    }
    set((state) => ({ items: [...state.items, { product, qty }] }));
  },
  removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.product.id !== id) })),
  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === id ? { ...item, qty: Math.max(1, qty) } : item,
      ),
    })),
  clearCart: () => set({ items: [] }),
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.qty, 0);
  },
  get totalPrice() {
    return Number(get().items.reduce((sum, item) => sum + item.product.trendoPrice * item.qty, 0).toFixed(2));
  },
}));
