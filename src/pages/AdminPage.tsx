import { useEffect, useMemo, useState } from 'react';

type AdminOrder = {
  orderId: string;
  items: Array<{ qty: number; trendoPrice?: number }>;
  profit: number;
  status: string;
  createdAt?: string;
};

const STORAGE_KEY = 'ADMIN_TOKEN';

export default function AdminPage() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) ?? '');
  const [inputToken, setInputToken] = useState('');
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load admin orders. Check token.');
        }

        const data = (await response.json()) as AdminOrder[];
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, [token]);

  const totalProfit = useMemo(
    () => Number(orders.reduce((sum, order) => sum + (order.profit ?? 0), 0).toFixed(2)),
    [orders],
  );

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <form
          className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8"
          onSubmit={(e) => {
            e.preventDefault();
            sessionStorage.setItem(STORAGE_KEY, inputToken);
            setToken(inputToken);
          }}
        >
          <h1 className="mb-6 text-2xl font-semibold">Admin Access</h1>
          <input
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            placeholder="Enter ADMIN_TOKEN"
            className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-white"
            required
          />
          <button className="mt-4 w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white">
            Access Admin
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">Total Profit</p>
          <p className="mt-1 text-3xl font-bold text-emerald-400">${totalProfit.toFixed(2)}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-800/80 text-zinc-300">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total Revenue</th>
                <th className="px-4 py-3">Profit</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalRevenue = Number(
                  order.items
                    .reduce((sum, item) => sum + (item.trendoPrice ?? 0) * item.qty, 0)
                    .toFixed(2),
                );
                return (
                  <tr key={order.orderId} className="border-t border-white/5">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-200">{order.orderId}</td>
                    <td className="px-4 py-3">{order.items.reduce((sum, item) => sum + item.qty, 0)}</td>
                    <td className="px-4 py-3">${totalRevenue.toFixed(2)}</td>
                    <td className="px-4 py-3 text-emerald-400">${(order.profit ?? 0).toFixed(2)}</td>
                    <td className="px-4 py-3 capitalize">{order.status}</td>
                    <td className="px-4 py-3 text-zinc-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading ? <p className="p-4 text-zinc-400">Loading orders...</p> : null}
          {error ? <p className="p-4 text-red-400">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
