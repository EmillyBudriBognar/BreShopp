'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ShoppingBag, Leaf, Truck, ShieldCheck } from 'lucide-react';
import ActionButton from '@/components/ActionButton';

const Hero = () => {
  // Refs para animação de scroll e controle de viewport
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Configuração do efeito parallax no background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  // Controle de animação quando o conteúdo entra na viewport
  const isInView = useInView(contentRef, {
    once: true,
    margin: '-20% 0px -20% 0px', // Ajuste fino do ponto de trigger
    amount: 0.3
  });

  // Definição das animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1, // Efeito cascata nos elementos filhos
        delayChildren: 0.2
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden h-[75vh]"
    >
      {/* Background com efeito parallax - só visível em desktop */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 hidden md:block"
        style={{ y: yBg }}
      >
        <img
          src="/assets/img/wallpaper.png"
          alt="Moda sustentável"
          className="object-cover object-center w-full h-full"
          sizes="100vw"
          loading="eager" // Prioriza carregamento
        />
        <div className="absolute inset-0 bg-gradient-to-r from-custom-cream/90 via-custom-cream/50 to-transparent" />
      </motion.div>

      {/* Conteúdo principal com animações controladas por viewport */}
      <div className="relative z-10 h-full flex flex-col">
        <main className="flex items-center h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={contentRef}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="max-w-2xl"
            >
              {/* Badge de oferta com ícone */}
              <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-custom-pink/20 text-custom-pink">
                <ShoppingBag className="w-3 h-3 mr-1.5" />
                Frete grátis para todo o Brasil
              </motion.div>

              {/* Títulos principais com hierarquia visual */}
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-custom-green mb-1 leading-tight">
                Moda Sustentável
              </motion.h1>
              
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-pink mb-4 leading-tight">
                Feita para Você
              </motion.h2>

              {/* Texto descritivo */}
              <motion.p variants={fadeInUp} className="text-base md:text-lg text-custom-green/90 mb-6 max-w-md leading-relaxed">
                Descubra peças exclusivas com história e ajude a reduzir o impacto ambiental da moda.
              </motion.p>

              {/* CTA principal e secundário */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-8">
                <ActionButton 
                  text="Ver Produtos" 
                  variant="solid" 
                  icon="arrow"
                  onClick={() => window.location.href = '#products'}
                />
                <ActionButton 
                  text="Ver Coleção" 
                  variant="outline"
                  onClick={() => window.location.href = '#collection'}
                />
              </motion.div>

              {/* Lista de benefícios com ícones */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-custom-green/80">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-custom-pink" />
                  Frete grátis
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-custom-pink" />
                  Pagamento seguro
                </span>
                <span className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-custom-pink" />
                  Sustentável
                </span>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;