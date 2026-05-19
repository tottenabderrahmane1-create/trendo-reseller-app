import { create } from 'zustand';

import type { Product } from './cartStore';

type ProductState = {
  products: Product[];
  categories: string[];
  activeCategory: string | null;
  setCategory: (cat: string | null) => void;
  fetchProducts: () => Promise<void>;
  filteredProducts: Product[];
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  activeCategory: null,
  setCategory: (cat) => set({ activeCategory: cat }),
  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const products = (await res.json()) as Product[];
    const categories = Array.from(new Set(products.map((product) => product.category)));
    set({ products, categories });
  },
  get filteredProducts() {
    const { products, activeCategory } = get();
    if (!activeCategory) return products;
    return products.filter((product) => product.category === activeCategory);
  },
}));

void useProductStore.getState().fetchProducts();
