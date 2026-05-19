import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type AdminOrder = {
  id: string;
  customer: string;
  itemCount: number;
  total: number;
  profit: number;
  createdAt: string;
};

export function AdminDashboardPage() {
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    const token = searchParams.get('token') || '';
    const load = async () => {
      const response = await fetch('/api/admin/orders', {
        headers: token ? { ADMIN_TOKEN: token } : undefined
      });
      if (!response.ok) return;
      setOrders((await response.json()) as AdminOrder[]);
    };
    void load();
  }, [searchParams]);

  const totals = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const profit = orders.reduce((sum, order) => sum + order.profit, 0);
    return { revenue, profit, count: orders.length };
  }, [orders]);

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>Admin Dashboard</h1>
        <div className="card-grid">
          <article className="panel"><p>Total Revenue</p><strong>${totals.revenue.toFixed(2)}</strong></article>
          <article className="panel"><p>Total Profit</p><strong>${totals.profit.toFixed(2)}</strong></article>
          <article className="panel"><p>Orders Count</p><strong>{totals.count}</strong></article>
        </div>
        <table className="table">
          <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Profit</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td><td>{order.customer}</td><td>{order.itemCount}</td>
                <td>${order.total.toFixed(2)}</td><td>${order.profit.toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
