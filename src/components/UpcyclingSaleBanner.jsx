'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, Store, ArrowRight } from 'lucide-react';
import ActionButton from '@/components/ActionButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const SustainableRewardsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const handleAgendarColeta = () => console.log('Agendar coleta clicado!');
  const handleVerLojas = () => console.log('Ver lojas clicado!');

  const benefits = [
    '+10% a cada 3 peças',
    'Cupom válido por 60 dias',
    'Ganhe até 30% OFF',
    'Embalagens sustentáveis',
  ];

  return (
    <section
      ref={containerRef}
      className="w-full relative bg-custom-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ delay: 0.1, duration: 1 }}
          className="absolute top-0 left-0 w-64 h-64 bg-custom-pink/10 rounded-full blur-[80px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-custom-olive/15 rounded-full blur-[80px]"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-28 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-16">
          {/* Text */}
          <div className="flex-1 max-w-2xl order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-8"
            >
              <span className="inline-flex items-center bg-white/90 text-custom-green text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                ♻️ PROGRAMA SUSTENTÁVEL
                <span className="ml-2 bg-custom-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  NOVO!
                </span>
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-custom-earth leading-tight mb-6"
            >
              <span className="block">Troque suas roupas</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-custom-olive to-custom-avocado"
              >
                por recompensas
              </motion.span>
            </motion.h2>

            <motion.p
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-custom-earth/90 mb-8 leading-relaxed"
            >
              <strong className="text-custom-green font-bold">Ganhe até 30% OFF</strong> na sua próxima compra ao doar roupas usadas.
              Sustentabilidade que transforma seu guarda-roupa e o planeta.
            </motion.p>

            {/* Benefits */}
            <motion.ul
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10"
            >
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-center text-custom-earth/90"
                >
                  <CheckCircle className="w-5 h-5 text-custom-green mr-3" />
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>

            {/* Buttons */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.div variants={fadeInUp}>
                <ActionButton
                  text="Agendar coleta"
                  onClick={handleAgendarColeta}
                  variant="solid"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  size="medium"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ActionButton
                  text="Ver lojas parceiras"
                  onClick={handleVerLojas}
                  variant="outline"
                  icon={<Store className="w-4 h-4" />}
                  iconPosition="right"
                  size="medium"
                />
              </motion.div>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center text-custom-earth/80 gap-3"
            >
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span>Avaliação: 5/5</span>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex justify-center relative mt-10 lg:mt-0 order-1 lg:order-2"
          >
            <div className="relative w-full max-w-md xl:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-r from-custom-olive/20 to-custom-green/20 rounded-3xl blur-lg -z-10"></div>

              <div className="overflow-hidden rounded-2xl border-4 border-white shadow-xl relative">
                <img
                  src="/assets/img/mocafelizcompras.jpg"
                  alt="Mulher feliz com compras sustentáveis"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 12 } : {}}
                transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                className="absolute -top-5 -right-5 bg-gradient-to-br from-custom-green to-custom-olive text-white font-bold text-xl sm:text-2xl px-4 sm:px-5 py-1 sm:py-2 rounded-full rotate-12 shadow-lg"
              >
                30% OFF
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainableRewardsSection;
