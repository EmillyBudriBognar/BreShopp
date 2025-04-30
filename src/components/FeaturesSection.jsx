'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1100); 

    return () => clearTimeout(timer);
  }, []);

  const features = useMemo(() => [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-custom-pink mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16V8a1 1 0 011-1h13a1 1 0 011 1v2h2a1 1 0 011 1v5h-1a3 3 0 01-6 0h-6a3 3 0 01-6 0H3z" />
        </svg>
      ),
      title: 'Frete Grátis',
      description: 'Confira Condições',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-custom-pink mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9c0 4.91 7 13 7 13s7-8.09 7-13c0-3.866-3.134-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      ),
      title: 'Enviamos',
      description: 'para todo Brasil',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-custom-pink mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18v10H3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12h2" />
        </svg>
      ),
      title: 'Até 12x sem juros',
      description: '10% Off no Boleto',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-custom-pink mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1l3 5h6l-5 4 2 6-5-3-5 3 2-6-5-4h6z" />
        </svg>
      ),
      title: '100% Seguro',
      description: 'Melhores Métodos',
    },
  ], []);

  const containerRef = useRef(null);

  return (
    <section className="py-2 bg-[#7f5e1030] bg-opacity-20 backdrop-blur-sm border-t border-white/20 overflow-hidden">
        <div 
            ref={containerRef}
            className="container mx-auto px-4 flex md:grid md:grid-cols-4 gap-6 text-center"
            style={{
                minWidth: `${features.length * 180}px`,
                scrollSnapType: 'x mandatory',
                overflowX: startAnimation ? 'auto' : 'hidden',
                overflowY: 'hidden', 
                WebkitOverflowScrolling: 'touch',
                transition: 'overflow 0.3s ease',
            }}
        >
          {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: 'spring',
              stiffness: 70,
              damping: 16,
              delay: 0.2 + index * 0.2,
            }}
            className="flex flex-col items-center px-4 py-2"
            style={{
              scrollSnapAlign: 'start',
              minWidth: '180px',
            }}
          >
            {feature.icon}
            <h3 className="text-xs font-semibold text-custom-green">{feature.title}</h3>
            <p className="text-[10px] text-custom-green">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;