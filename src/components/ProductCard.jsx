'use client';

import { motion, useInView } from 'framer-motion';
import { Heart, ArrowRight, Info } from 'lucide-react';
import { useRef } from 'react';

const ProductCard = ({ product, customDelay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleNavigate = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: customDelay,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -5,
      boxShadow:
        '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover="hover"
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition h-full flex flex-col cursor-pointer group"
    >
      <motion.div variants={hoverVariants} className="relative flex-1">
        <div
          className="block h-full"
          onClick={() => handleNavigate(product.id)}
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
        </div>

        {product.tag && (
          <motion.span
            className="absolute top-2 right-2 bg-custom-pink text-white text-xs px-2 py-1 rounded"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {product.tag}
          </motion.span>
        )}
      </motion.div>

      <div className="p-4 flex flex-col flex-grow-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-custom-green flex-1">
            <span
              onClick={() => handleNavigate(product.id)}
              className="hover:underline line-clamp-2 cursor-pointer flex items-center"
              title={product.name}
            >
              {product.name}
              <ArrowRight className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </h3>
          <motion.span
            className="font-bold text-custom-green whitespace-nowrap ml-2"
            whileHover={{ scale: 1.05 }}
          >
            R$ {Number(product.price).toFixed(2).replace('.', ',')}
          </motion.span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Info className="h-4 w-4 mr-1" />
          <p className="truncate" title={product.brecho}>
            {product.brecho}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <motion.span
            className="text-xs bg-custom-cream text-custom-green px-2 py-1 rounded"
            whileHover={{ scale: 1.05 }}
          >
            {product.condition}
          </motion.span>
          <motion.button
            className="text-gray-400 hover:text-custom-pink transition-colors"
            aria-label="Adicionar aos favoritos"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="h-5 w-5" fill="transparent" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
