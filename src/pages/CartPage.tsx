import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { items, subtotal, removeItem, updateQty, itemCount } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center">
        <div className="rounded-3xl border border-dashed p-12">
          <p className="text-5xl">🛒</p>
          <h2 className="mt-4 text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-slate-500">Add trending picks to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-semibold">Cart ({itemCount})</h1>
      <div className="space-y-4">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="rounded-2xl border border-white/30 bg-white/50 p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-slate-500">${product.trendoPrice.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(product.id, qty - 1)} className="rounded border px-2">-</button>
                <span>{qty}</span>
                <button onClick={() => updateQty(product.id, qty + 1)} className="rounded border px-2">+</button>
              </div>
              <button onClick={() => removeItem(product.id)} className="rounded border px-3 py-1 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border p-6">
        <p className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</p>
        <Link to="/checkout" className="mt-4 inline-block rounded-xl bg-black px-5 py-3 text-white">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
