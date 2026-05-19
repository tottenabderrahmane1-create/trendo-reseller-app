import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useCartStore } from '../store/cartStore';
import { useProductStore } from '../store/productStore';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const products = useProductStore((state) => state.products);
  const addItem = useCartStore((state) => state.addItem);

  const product = useMemo(() => products.find((item) => item.id === id), [products, id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-zinc-900 p-10 text-center">
          <p className="text-zinc-300">Product not found.</p>
        </div>
      </div>
    );
  }

  const filledRating = Math.round(product.rating);

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-white/10 bg-zinc-900 p-6 md:grid-cols-2"
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full min-h-[320px] w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="h-full min-h-[320px] w-full rounded-2xl bg-gradient-to-br from-purple-700/40 to-indigo-700/40" />
        )}

        <div className="flex flex-col">
          <span className="inline-block w-fit rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
            {product.category}
          </span>
          <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-4xl font-extrabold text-white">${product.trendoPrice.toFixed(2)}</p>

          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-300">
            <span className="rounded-full border border-white/10 bg-zinc-800 px-3 py-1">
              Ships in {product.shippingDays} days
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-zinc-300">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={idx} className={idx < filledRating ? 'text-white' : 'text-zinc-600'}>
                ●
              </span>
            ))}
            <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
          </div>

          <button
            onClick={() => addItem(product, 1)}
            className="mt-8 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-100"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}
