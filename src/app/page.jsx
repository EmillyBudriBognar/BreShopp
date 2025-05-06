'use client';

import React from 'react';

// Componentes
import ImpactBanner from '../components/ImpactBanner';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedProducts from '../components/FeaturedProducts';
import UpcyclingSaleBanner from '../components/UpcyclingSaleBanner';
import ProductGrid from '../components/ProductGrid';
import AppPromoSection from '../components/AppPromoSection';
import DonationSection from '../components/DonationSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Produto Exemplo 1',
      description: 'Descrição do Produto 1',
      price: '99.99',
      image: '/assets/img/roupa.png',
      brecho: 'Brechó Sustentável',
      condition: 'Usado - Bom estado',
    },
    {
      id: 2,
      name: 'Produto Exemplo 2',
      description: 'Descrição do Produto 2',
      price: '129.99',
      image: '/assets/img/roupa.png',
      brecho: 'Moda Consciente',
      condition: 'Novo',
    },
    {
      id: 3,
      name: 'Produto Exemplo 3',
      description: 'Descrição do Produto 3',
      price: '79.99',
      image: '/assets/img/roupa.png',
      brecho: 'Brechó Solidário',
      condition: 'Usado - Ótimo estado',
    },
    {
      id: 4,
      name: 'Produto Exemplo 4',
      description: 'Descrição do Produto 4',
      price: '199.99',
      image: '/assets/img/roupa.png',
      brecho: 'Moda Sustentável',
      condition: 'Novo',
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <ImpactBanner />
      <div id="hero-section">
        <Hero />
      </div>
      <FeaturesSection />
      <FeaturedProducts />
      <UpcyclingSaleBanner />
      <ProductGrid products={featuredProducts} />
      <AppPromoSection />
      <DonationSection />
      <Footer />
    </main>
  );
};

export default Home;
