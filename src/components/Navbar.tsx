import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const itemCount = useCartStore((state) => state.totalItems);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/75 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-white">
        <Link to="/products" className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent">
          TRENDO
        </Link>

        <nav className="flex items-center gap-8 text-sm">
          <Link to="/products" className="text-zinc-200 hover:text-white">Products</Link>
          <Link to="/cart" className="relative text-zinc-200 hover:text-white">
            Cart
            {itemCount > 0 ? (
              <span className="ml-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs text-white">{itemCount}</span>
            ) : null}
          </Link>
        </nav>

        <Link to="/admin" className="text-sm text-zinc-400 hover:text-zinc-200">Admin</Link>
      </div>
    </motion.header>
  );
}
