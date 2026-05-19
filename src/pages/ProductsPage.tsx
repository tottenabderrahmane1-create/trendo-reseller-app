import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { useProducts } from '../hooks/useProducts';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = !activeCategory || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setActiveCategory(null)} className="rounded-full border px-4 py-2 text-sm">All</button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className="rounded-full border px-4 py-2 text-sm">{cat}</button>
        ))}
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="mb-6 w-full rounded-xl border p-3" />
      {loading ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200" />)}</div> : null}
      {error ? <p>{error}</p> : null}
      {!loading && filtered.length === 0 ? <p className="rounded-2xl border border-dashed p-12 text-center">No products matched your search.</p> : null}
      <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <motion.article key={product.id} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="rounded-2xl border p-4 shadow-sm">
            <img src={product.images[0]} alt={product.name} className="mb-3 h-44 w-full rounded-xl object-cover" />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-slate-500">{product.category}</p>
            <p className="mt-2 font-medium">${product.trendoPrice.toFixed(2)}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
