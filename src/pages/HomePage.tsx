import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600/20 via-fuchsia-500/20 to-indigo-500/20 blur-3xl animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">The Future of Shopping.</h1>
        <p className="mt-5 text-lg text-zinc-300 sm:text-xl">
          Curated trending products. Premium quality. Delivered fast.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="mt-10 inline-block">
          <Link
            to="/products"
            className="inline-flex items-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-black"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
