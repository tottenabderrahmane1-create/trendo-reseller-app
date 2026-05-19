import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function OrderConfirmationPage(): JSX.Element {
  const { orderId = '' } = useParams();

  const mockOrder = useMemo(
    () => ({
      id: 'demo-order-123',
      items: [
        { id: 'item-1', name: 'Demo Smart Watch', price: 49.99, quantity: 1 },
        { id: 'item-2', name: 'Demo Earbuds', price: 20, quantity: 2 }
      ] as OrderItem[],
      total: 89.99,
      eta: '5-7 business days'
    }),
    []
  );

  const order = orderId === 'demo-order-123' ? mockOrder : null;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">✓</div>
        <h1 className="text-2xl font-bold">Order Confirmed</h1>
      </motion.div>

      {order ? (
        <div className="rounded-lg border p-5">
          <p className="mb-3 text-sm text-gray-500">Order ID: {order.id}</p>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4 font-semibold flex justify-between"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
          <p className="mt-3 text-sm">Estimated delivery: {order.eta}</p>
        </div>
      ) : (
        <div className="rounded-lg border p-5">Unable to find this order.</div>
      )}
    </div>
  );
}
