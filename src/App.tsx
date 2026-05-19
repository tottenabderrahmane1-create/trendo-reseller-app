import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LegalPage from './pages/LegalPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/legal/suppliers" element={<LegalPage />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
