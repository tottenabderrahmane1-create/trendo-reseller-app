export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  markupPercentage: number;
};

type CartStore = {
  items: CartItem[];
  clearCart: () => void;
};

const defaultItems: CartItem[] = [
  { id: 'sku_1', name: 'Trending Product', price: 49.99, quantity: 1, markupPercentage: 20 }
];

export function useCartStore(): CartStore {
  return {
    items: defaultItems,
    clearCart: () => undefined
  };
}
