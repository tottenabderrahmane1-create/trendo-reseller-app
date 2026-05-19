import { motion } from 'framer-motion';

const OrderPage = () => {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-navy text-3xl font-semibold text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      OrderPage
    </motion.div>
  );
};

export default OrderPage;
