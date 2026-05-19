import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="h-[60px] border-t border-white/10 bg-zinc-950 text-zinc-400">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 text-sm">
        <p>© 2025 TRENDO</p>
        <Link to="/legal/suppliers" className="hover:text-zinc-200">Supplier Attribution</Link>
        <p>All prices in USD</p>
      </div>
    </footer>
  );
}
