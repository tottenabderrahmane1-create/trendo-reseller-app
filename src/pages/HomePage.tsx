import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';

const categories = ['All', 'Streetwear', 'Accessories', 'Shoes', 'Outerwear'];

const products = [
  { id: 1, name: 'Midnight Bomber', price: 89, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' },
  { id: 2, name: 'Indigo Runner', price: 129, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' },
  { id: 3, name: 'Aurora Hoodie', price: 72, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
  { id: 4, name: 'Violet Cap', price: 34, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800' },
  { id: 5, name: 'Slate Backpack', price: 95, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800' },
  { id: 6, name: 'Noir Overshirt', price: 84, image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800' }
];

const testimonials = [
  { name: 'Amara J.', quote: 'TRENDO made my sourcing workflow feel premium and effortless.' },
  { name: 'Leo M.', quote: 'The curation is sharp, and the experience feels polished end-to-end.' },
  { name: 'Nia R.', quote: 'Fast, sleek, and reliable. Exactly what a reseller dashboard should be.' }
];

const heroWords = ['Elevate', 'Your', 'Reseller', 'Flow'];

const HomePage = () => {
  return (
    <div className="grain min-h-screen bg-navy px-6 py-10 md:px-10">
      <div className="mx-auto max-w-7xl space-y-16">
        <section className="space-y-6">
          <motion.h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            {heroWords.map((word, index) => (
              <motion.span
                key={word}
                className="mr-3 inline-block bg-gradient-to-r from-indigo to-violet bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.45 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="max-w-2xl text-white/70">Premium product discovery and order orchestration for modern sellers.</p>
          <Button>Start selling now</Button>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  index === 0 ? 'bg-indigo text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-white/80">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-indigo">{item.name}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-white/10 py-8 text-sm text-white/60">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-semibold text-white">TRENDO</p>
            <nav className="flex gap-4">
              <a href="/products">Products</a>
              <a href="/cart">Cart</a>
              <a href="/legal/suppliers">Legal</a>
            </nav>
            <p>Reseller platform preview. Supplier terms and compliance apply.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
