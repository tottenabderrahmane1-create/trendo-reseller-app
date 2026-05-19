import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  const markedPrice = price * 1.08;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
    >
      <img src={image} alt={name} className="h-52 w-full object-cover" />
      <div className="space-y-4 p-5">
        <h3 className="font-serif text-2xl text-white">{name}</h3>
        <div className="space-x-3">
          <span className="text-lg font-semibold text-indigo">${markedPrice.toFixed(2)}</span>
          <span className="text-sm text-white/50 line-through">${price.toFixed(2)}</span>
        </div>
        <Button className="w-full">Add to cart</Button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
