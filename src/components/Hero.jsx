'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  const offerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const benefitsRef = useRef(null);

  const [canAnimate, setCanAnimate] = useState(false);

  const offerInView = useInView(offerRef, { once: true, margin: '-100px' });
  const titleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const subtitleInView = useInView(subtitleRef, { once: true, margin: '-100px' });
  const descInView = useInView(descRef, { once: true, margin: '-100px' });
  const buttonsInView = useInView(buttonsRef, { once: true, margin: '-100px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanAnimate(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden" style={{ height: '72vh' }}>
      
      {/* Background */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 hidden md:block"
        style={{ y: yBg }}
      >
        <img
          src="/assets/img/wallpaper.png"
          alt="Moda sustentável"
          className="object-cover object-center w-full h-full"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-custom-cream/90 via-custom-cream/50 to-transparent" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex flex-col">
        <main className="flex items-center" style={{ height: '85vh' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
               {/* Offer Badge */}
              <motion.div
                ref={offerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={canAnimate && offerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 15 }}
                className="mb-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-custom-pink/20 text-custom-pink"
              >
                <ShoppingBagIcon className="w-3 h-3 mr-1" />
                Frete grátis para todo o Brasil
              </motion.div>

              {/* Title */}
              <motion.h1
                ref={titleRef}
                initial={{ opacity: 0, y: 30 }}
                animate={canAnimate && titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-custom-green mb-1"
              >
                Moda Sustentável
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                ref={subtitleRef}
                initial={{ opacity: 0, y: 30 }}
                animate={canAnimate && subtitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                className="text-3xl sm:text-4xl font-bold text-custom-pink mb-4"
              >
                Feita para Você
              </motion.h2>

              {/* Description */}
              <motion.p
                ref={descRef}
                initial={{ opacity: 0, y: 20 }}
                animate={canAnimate && descInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                className="text-base text-custom-green/90 mb-6 max-w-md"
              >
                Descubra peças exclusivas com história e ajude a reduzir o impacto ambiental da moda.
              </motion.p>

              {/* Buttons */}
              <motion.div
                ref={buttonsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={canAnimate && buttonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                className="flex flex-col sm:flex-row gap-3 mb-6"
              >
                <a
                  href="#products"
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-custom-olive hover:bg-custom-green transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-olive"
                >
                  Ver Produtos →
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </a>
                <a
                  href="#collection"
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-custom-green bg-custom-olive/20 hover:bg-custom-olive/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-olive/50"
                >
                  Ver Coleção
                </a>
              </motion.div>

              {/* Benefits */}
              <motion.div
                ref={benefitsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={canAnimate && benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                className="flex flex-wrap items-center gap-3 text-sm text-custom-green/80"
              >
                <span className="flex items-center gap-1">
                  <span className="text-custom-pink">✓</span> Frete grátis
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-custom-pink">✓</span> Troca facilitada
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-custom-pink">✓</span> Pagamento seguro
                </span>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;