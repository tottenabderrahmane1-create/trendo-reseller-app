import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '';
const shouldUseMockCheckout = /mock|placeholder/i.test(stripeKey);

function OrderSummarySidebar() {
  return (
    <aside className="rounded-lg border p-4">
      <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>Demo Item A</span><span>$49.99</span></div>
        <div className="flex justify-between"><span>Demo Item B</span><span>$40.00</span></div>
        <div className="mt-2 border-t pt-2 flex justify-between font-semibold"><span>Total</span><span>$89.99</span></div>
      </div>
    </aside>
  );
}

function MockCheckoutForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate('/orders/demo-order-123');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Mock Checkout Form</h2>
      <input className="w-full rounded border p-2" placeholder="Card Number" required />
      <div className="grid grid-cols-2 gap-3">
        <input className="rounded border p-2" placeholder="MM/YY" required />
        <input className="rounded border p-2" placeholder="CVC" required />
      </div>
      <input className="w-full rounded border p-2" placeholder="Cardholder Name" required />
      <button type="submit" className="w-full rounded bg-black p-2 text-white" disabled={loading}>
        {loading ? 'Processing Demo Payment...' : 'Pay Now (Demo)'}
      </button>
    </form>
  );
}

function RealCheckoutPlaceholder() {
  return <div className="rounded-lg border p-4">Stripe checkout renders here.</div>;
}

export default function CheckoutPage() {
  const content = useMemo(() => {
    if (shouldUseMockCheckout) {
      return <MockCheckoutForm />;
    }

    return <RealCheckoutPlaceholder />;
  }, []);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 p-6 md:grid-cols-[2fr_1fr]">
      {content}
      <OrderSummarySidebar />
    </div>
  );
}
