import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

type CheckoutResponse = {
  orderId: string;
  clientSecret: string;
};

const cardElementOptions = {
  style: {
    base: {
      color: 'var(--color-text-primary)',
      fontSize: '16px'
    }
  }
};

export function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const markup = items.reduce((sum, item) => sum + item.price * item.quantity * (item.markupPercentage / 100), 0);
    return { subtotal, markup, total: subtotal + markup };
  }, [items]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });

      if (!response.ok) throw new Error('Unable to initialize payment.');

      const payload = (await response.json()) as CheckoutResponse;
      const card = elements.getElement(CardElement);
      if (!card) throw new Error('Card details are missing.');

      const result = await stripe.confirmCardPayment(payload.clientSecret, {
        payment_method: { card }
      });

      if (result.error) throw new Error(result.error.message || 'Payment failed.');

      clearCart();
      navigate(`/orders/${payload.orderId}`);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unexpected checkout error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main className="page-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="panel-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <h1>Checkout</h1>
          <p className="muted">Complete your secure payment using Stripe.</p>
          <div className="card-field">
            <CardElement options={cardElementOptions} />
          </div>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit" disabled={!stripe || isSubmitting} className="btn-primary">
            {isSubmitting ? 'Processing...' : `Pay $${summary.total.toFixed(2)}`}
          </button>
        </form>

        <aside className="panel">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="summary-row">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row"><span>Subtotal</span><span>${summary.subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Markup</span><span>${summary.markup.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${summary.total.toFixed(2)}</span></div>
        </aside>
      </section>
    </motion.main>
  );
}
