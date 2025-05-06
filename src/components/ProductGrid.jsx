'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ActionButton from '@/components/ActionButton';

const ProductGrid = ({ products = [] }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px 0px -100px 0px',
    amount: 0.2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18
      }
    }
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
        delay
      }
    }
  });

  return (
    <motion.section
      ref={containerRef}
      className="py-20 bg-custom-cream overflow-hidden px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wide text-custom-pink bg-pink-100 px-4 py-1 rounded-full"
          >
            Destaques
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-green mt-4"
          >
            Peças em Destaque ✨
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-custom-green/80 mt-4 max-w-2xl mx-auto"
          >
            Estilo único, propósito sustentável. Veja nossas escolhas favoritas.
          </motion.p>
        </motion.div>

        {/* Grid */}
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeUp(index * 0.1)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-custom-green/80">Nenhum produto disponível no momento</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <ActionButton
            text="Ver todas as peças"
            onClick={() => (window.location.href = '/categorias')}
            variant="solid"
            icon="arrow"
            className="mx-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductGrid;
