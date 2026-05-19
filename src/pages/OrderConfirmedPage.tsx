import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';

export default function OrderConfirmedPage() {
  const [params] = useSearchParams();
  const orderId = params.get('id') ?? 'N/A';

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-purple-400/30 bg-zinc-900 p-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20 text-4xl"
        >
          ✅
        </motion.div>
        <h1 className="text-3xl font-semibold">Order Confirmed</h1>
        <p className="mt-3 text-zinc-300">Your order is on its way.</p>
        <p className="mt-2 text-sm text-zinc-400">Order ID: {orderId}</p>
        <Link to="/products" className="mt-8 inline-block rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
