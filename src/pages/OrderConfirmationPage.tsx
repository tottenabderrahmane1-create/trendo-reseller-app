import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

type OrderItem = { id: string; name: string; quantity: number; unitPrice: number };
type Order = { id: string; items: OrderItem[]; total: number; estimatedDelivery: string };

export function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) return;
      setOrder((await response.json()) as Order);
    };
    if (id) void loadOrder();
  }, [id]);

  return (
    <main className="page-shell">
      <section className="panel">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="success-mark">
          <motion.span initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>✓</motion.span>
        </motion.div>
        <h1>Payment Successful</h1>
        <p className="muted">Order ID: {order?.id || id}</p>
        {order?.items.map((item) => (
          <div key={item.id} className="summary-row">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-row total"><span>Total Paid</span><span>${order?.total.toFixed(2) ?? '0.00'}</span></div>
        <p className="muted">Estimated delivery: {order?.estimatedDelivery ?? 'Calculating...'}</p>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </section>
    </main>
  );
}
