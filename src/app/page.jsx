'use client'; // Indica que este é um componente do lado do cliente (Next.js)

import React from 'react'; 
import ImpactBanner from '@/components/ImpactBanner';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import UpcyclingSaleBanner from '@/components/UpcyclingSaleBanner';
import DonationCarousel from '@/components/DonationCarousel';
import AppPromoSection from '@/components/AppPromoSection';
import DonationSection from '@/components/DonationSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
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
      <DonationCarousel />
      <AppPromoSection />
      <DonationSection />
      <Footer />
    </main>
  );
};

export default Home;