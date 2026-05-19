import { Route, Routes } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders/:id" element={<OrderConfirmationPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
    </Routes>
  );
}
