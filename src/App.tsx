import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

function Layout({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <nav className="flex gap-4 text-blue-600 underline">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout title="Trendo Home" />} />
        <Route path="/products" element={<Layout title="Products" />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/admin" element={<Layout title="Admin Dashboard" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
