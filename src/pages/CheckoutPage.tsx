import { PaymentElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart';

const stripePromise = loadStripe((import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY ?? '');

function PaymentStep({
  shippingAddress,
}: {
  shippingAddress: { name: string; address1: string; city: string; country: string; postalCode: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);

    const paymentIntentResponse = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((item) => ({ productId: item.product.id, qty: item.qty })),
      }),
    });

    const { clientSecret } = await paymentIntentResponse.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(PaymentElement) as any,
      },
    });

    if (result.error || !result.paymentIntent) {
      setSubmitting(false);
      return;
    }

    const completeResponse = await fetch('/api/checkout/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentIntentId: result.paymentIntent.id,
        shippingAddress,
        items: items.map((item) => ({ productId: item.product.id, qty: item.qty })),
      }),
    });

    const completeData = await completeResponse.json();
    navigate(`/order-confirmed?id=${completeData.orderId}`);
  };

  return (
    <div className="rounded-2xl border border-purple-400/30 bg-zinc-900 p-6">
      <PaymentElement />
      <button onClick={() => void handlePay()} disabled={submitting || !stripe} className="mt-6 w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold text-white">
        {submitting ? 'Processing...' : 'Complete Payment'}
      </button>
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [shippingAddress, setShippingAddress] = useState({ name: '', address1: '', city: '', country: '', postalCode: '' });

  const elementOptions = useMemo(() => ({ mode: 'payment' as const, currency: 'usd' as const, amount: 1000 }), []);

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Secure Checkout</h1>

        {step === 1 ? (
          <form
            className="space-y-4 rounded-2xl border border-purple-400/30 bg-zinc-900 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            {['name', 'address1', 'city', 'country', 'postalCode'].map((field) => (
              <input
                key={field}
                required
                placeholder={field}
                value={(shippingAddress as any)[field]}
                onChange={(e) => setShippingAddress((prev) => ({ ...prev, [field]: e.target.value }))}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 capitalize"
              />
            ))}
            <button className="w-full rounded-xl bg-purple-500 px-4 py-3 font-semibold">Continue to Payment</button>
          </form>
        ) : (
          <Elements stripe={stripePromise} options={elementOptions}>
            <PaymentStep shippingAddress={shippingAddress} />
          </Elements>
        )}
      </div>
    </div>
  );
}
