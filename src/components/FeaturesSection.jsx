'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

const FeaturesSection = () => {
  // Estado para controlar o início das animações
  const [startAnimation, setStartAnimation] = useState(false);

  // Dispara as animações após 1.1s (delay intencional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Dados das features (memorizado para evitar recriação)
  const features = useMemo(() => [
    {
      icon: <Truck className="w-6 h-6 text-custom-pink mb-1" />,
      title: 'Frete Grátis',
      description: 'Confira Condições',
    },
    {
      icon: <MapPin className="w-6 h-6 text-custom-pink mb-1" />,
      title: 'Enviamos',
      description: 'para todo Brasil',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-custom-pink mb-1" />,
      title: 'Até 12x sem juros',
      description: '10% Off no Boleto',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-custom-pink mb-1" />,
      title: '100% Seguro',
      description: 'Melhores Métodos',
    },
  ], []);

  const containerRef = useRef(null);

  return (
    <section className="py-2 bg-[#E7E1D2] bg-opacity-20 backdrop-blur-sm border-t border-white/20 overflow-hidden">
      {/* Container scrollável horizontalmente */}
      <div 
        ref={containerRef}
        className="container mx-auto px-4 flex md:grid md:grid-cols-4 gap-6 text-center"
        style={{
          minWidth: `${features.length * 180}px`, // Largura mínima baseada no número de features
          scrollSnapType: 'x mandatory', // Scroll suave com snap
          overflowX: startAnimation ? 'auto' : 'hidden', // Controle de overflow
          overflowY: 'hidden',
          WebkitOverflowScrolling: 'touch', // Melhora scroll no iOS
          transition: 'overflow 0.3s ease',
        }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }} // Estado inicial escondido
            animate={startAnimation ? { opacity: 1, y: 0 } : {}} // Animação quando ativada
            transition={{
              type: 'spring', // Tipo de animação dinâmica
              stiffness: 70, // Rigidez da mola
              damping: 16, // Amortecimento
              delay: 0.2 + index * 0.2, // Atraso progressivo por item
            }}
            className="flex flex-col items-center px-4 py-2"
            style={{
              scrollSnapAlign: 'start', // Alinhamento do snap
              minWidth: '180px', // Largura mínima de cada card
            }}
          >
            {/* Ícone da feature */}
            {feature.icon}
            
            {/* Título e descrição */}
            <h3 className="text-xs font-semibold text-custom-green">{feature.title}</h3>
            <p className="text-[10px] text-custom-green">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;