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
  // Produtos de exemplo
  const featuredProducts = [
    {
      id: 1,
      name: 'Produto Exemplo 1',
      description: 'Descrição do Produto 1',
      price: 'R$ 99,99',
      image: 'url_da_imagem_1.jpg',
      brecho: 'Brechó Sustentável',
      condition: 'Usado - Bom estado',
    },
    {
      id: 2,
      name: 'Produto Exemplo 2',
      description: 'Descrição do Produto 2',
      price: 'R$ 129,99',
      image: 'url_da_imagem_2.jpg',
      brecho: 'Moda Consciente',
      condition: 'Novo',
    },
  ];

  return (
      <main className="flex flex-col min-h-screen">
      <Header/>
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
        <Footer/>
      </main>
  );
};

export default Home;