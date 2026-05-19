import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQty);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.totalPrice);
  const itemCount = useCartStore((state) => state.totalItems);

  return { items, addItem, removeItem, updateQty, clearCart, subtotal, itemCount };
};
