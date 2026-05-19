import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

type CheckoutResponse = {
  orderId: string;
};

export function CheckoutPage() {
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
    if (isSubmitting) return;

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
          <p className="muted">Secure payment details</p>
          <div className="card-field">
            <label>Card Number</label>
            <input required placeholder="4242 4242 4242 4242" />
            <label>Expiry</label>
            <input required placeholder="MM/YY" />
            <label>CVC</label>
            <input required placeholder="CVC" />
          </div>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit" disabled={isSubmitting} className="btn-primary">
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
