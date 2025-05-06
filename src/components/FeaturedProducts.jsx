'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shirt, StretchHorizontal, Watch, Footprints } from 'lucide-react';
import ActionButton from '@/components/ActionButton';

const FeaturedProducts = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px 0px -100px 0px',
    amount: 0.2
  });

  const categories = [
    { 
      id: 1, 
      name: "Camisas", 
      slug: "camisas", 
      icon: <Shirt size={36} strokeWidth={1.5} />,
      color: "bg-blue-100"
    },
    { 
      id: 2, 
      name: "Calças", 
      slug: "calcas", 
      icon: <StretchHorizontal size={36} strokeWidth={1.5} />,
      color: "bg-pink-100" 
    },
    { 
      id: 3, 
      name: "Acessórios", 
      slug: "acessorios", 
      icon: <Watch size={36} strokeWidth={1.5} />,
      color: "bg-green-100" 
    },
    { 
      id: 4, 
      name: "Tênis", 
      slug: "tenis", 
      icon: <Footprints size={36} strokeWidth={1.5} />,
      color: "bg-purple-100" 
    },
  ];

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

  return (
    <motion.section
      ref={containerRef}
      className="bg-custom-cream py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
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
            className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-custom-green uppercase rounded-full bg-emerald-100"
          >
            Coleções em destaque
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Categorias que amamos 💖
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Estilo, propósito e personalidade. Encontre peças que contam a sua história.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {categories.map((cat) => (
            <motion.a
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              aria-label={`Ver categoria ${cat.name}`}
              className={`group relative ${cat.color} rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-64 flex flex-col items-center justify-center text-center`}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0" />
              <div className="relative z-10 flex flex-col items-center justify-center p-6">
                <div className="text-gray-800 mb-4">{cat.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{cat.name}</h3>
                <span className="text-sm text-gray-800/90 mt-1">Ver mais</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <ActionButton
            text="Explorar todas as categorias"
            onClick={() => window.location.href = '/categorias'}
            variant="solid"
            icon="arrow"
            className="mx-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;