import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart'>;

interface ButtonProps extends NativeButtonProps {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-indigo to-violet text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_32px_rgba(139,92,246,0.45)]',
  ghost: 'bg-transparent text-white hover:bg-white/10',
  outline: 'border border-white/30 bg-transparent text-white hover:bg-white/10'
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', type = 'button', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(139,92,246,0.5)' }}
        whileTap={{ scale: 0.98 }}
        className={clsx(
          'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo/70 disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          className
        )}
        {...(props as Record<string, unknown>)}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
