import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HandHeart, MapPin, Shirt, Route, Venus, Mars, Move, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import ActionButton from './ActionButton';

const DonationCarousel = () => {
  // Configurações de animação para entrada dos elementos
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // Controles para animações de scroll
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const swiperRef = useRef(null);
  const swiperInView = useInView(swiperRef, { once: true, margin: "-100px" });

  // Estado para controle de navegação do carrossel
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Dados das instituições que recebem doações
  const donations = [
    {
      id: 1,
      orgName: "Lar das Crianças",
      location: "Vila Mariana - SP",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Shirt size={12} className="mr-1" />,
      tagText: "Roupas Infantis",
      tagColor: "bg-custom-pink/10 text-custom-pink",
      title: "Precisamos de roupas para crianças de 2 a 10 anos",
      description: "Estamos recebendo doações para 120 crianças carentes. Qualquer peça em bom estado é bem-vinda!"
    },
    {
      id: 2,
      orgName: "Casa de Apoio",
      location: "Centro - RJ",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Route size={12} className="mr-1" />,
      tagText: "Calças e Jaquetas",
      tagColor: "bg-custom-olive/10 text-custom-green",
      title: "Doações para moradores em situação de rua",
      description: "Precisamos especialmente de calças e jaquetas para adultos, tamanhos M a GG."
    },
    {
      id: 3,
      orgName: "Projeto Renascer",
      location: "Belo Horizonte - MG",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Venus size={12} className="mr-1" />,
      tagText: "Roupas Femininas",
      tagColor: "bg-custom-pink/10 text-custom-pink",
      title: "Vestuário para mulheres em vulnerabilidade",
      description: "Aceitamos roupas, sapatos e acessórios para mulheres que estão reconstruindo suas vidas."
    },
    {
      id: 4,
      orgName: "Abrigo São Francisco",
      location: "Porto Alegre - RS",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Mars size={12} className="mr-1" />,
      tagText: "Roupas Masculinas",
      tagColor: "bg-custom-olive/10 text-custom-green",
      title: "Agasalhos para o inverno",
      description: "Estamos coletando casacos, blusas de frio e cobertores para o inverno rigoroso."
    },
    {
      id: 5,
      orgName: "Educar para o Futuro",
      location: "Recife - PE",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Shirt size={12} className="mr-1" />,
      tagText: "Uniformes Escolares",
      tagColor: "bg-custom-pink/10 text-custom-pink",
      title: "Uniformes usados em bom estado",
      description: "Coletamos uniformes escolares para crianças de comunidades carentes."
    },
    {
      id: 6,
      orgName: "Vida Nova",
      location: "Salvador - BA",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
      tagIcon: <Move size={12} className="mr-1" />,
      tagText: "Calçados",
      tagColor: "bg-custom-olive/10 text-custom-green",
      title: "Sapatos e tênis para todas as idades",
      description: "Precisamos de calçados em bom estado, números 32 ao 42."
    }
  ];

  // Manipulador de eventos do Swiper
  const handleSwiper = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    
    swiper.on('slideChange', () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    });
  };

  return (
    <section className="py-20 bg-custom-cream px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho com animação de fade-in */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1 mb-4 text-xs font-bold tracking-widest text-custom-green uppercase rounded-full bg-custom-olive/20">
            <HandHeart size={14} className="mr-1" /> Programa de Doações
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-custom-green mb-4 font-hussar">
            Doe e Transforme Vidas ✨
          </h2>
          <p className="text-base sm:text-lg text-custom-earth/80 mt-2 max-w-2xl mx-auto leading-relaxed">
            Suas roupas podem ter um novo propósito. Conectamos doações a quem realmente precisa.
          </p>
        </motion.div>

        {/* Carrossel com animação de slide-up */}
        <motion.div
          ref={swiperRef}
          initial="hidden"
          animate={swiperInView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="relative group"
        >
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            onSwiper={handleSwiper}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={false}
            grabCursor={true}
            breakpoints={{
              640: { 
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            pagination={{ 
              clickable: true,
              el: '.donation-pagination',
              bulletClass: 'swiper-pagination-bullet w-2.5 h-2.5 mx-1.5 inline-block rounded-full bg-custom-green opacity-20 transition-all duration-300',
              bulletActiveClass: '!opacity-100 !bg-custom-pink !w-6'
            }}
            navigation={{
              nextEl: '.donation-next',
              prevEl: '.donation-prev',
            }}
            className="pb-16 px-2"
          >
            {donations.map((donation) => (
              <SwiperSlide key={donation.id}>
                {/* Card de doação com efeito hover */}
                <motion.div 
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 flex flex-col min-h-[420px] h-full justify-between transition-all duration-300 border border-transparent hover:border-custom-pink/10"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={donation.image} 
                        alt={donation.orgName} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-custom-cream"
                        loading="lazy"
                      />
                      <div>
                        <p className="font-bold text-sm text-custom-green">{donation.orgName}</p>
                        <p className="text-xs text-custom-earth/60 flex items-center">
                          <MapPin size={12} className="mr-1" /> {donation.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium ${donation.tagColor} rounded-full mb-3`}>
                        {donation.tagIcon}
                        {donation.tagText}
                      </span>
                      <h3 className="text-lg font-bold text-custom-green leading-tight mb-3 line-clamp-2">
                        {donation.title}
                      </h3>
                      <p className="text-sm text-custom-earth/70 line-clamp-3">
                        {donation.description}
                      </p>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <div className="pt-4 mt-4 border-t border-custom-cream">
                    <ActionButton 
                      text="Quero Doar"
                      icon="heart"
                      variant="solid"
                      fullWidth
                      size="medium"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação customizada do carrossel */}
          <div className="donation-pagination text-center mt-6" />

          <button 
            className={`donation-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-custom-pink hover:bg-custom-pink hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 ${isEnd ? 'opacity-20 cursor-not-allowed' : ''}`}
            aria-label="Próximo slide"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
          <button 
            className={`donation-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-custom-pink hover:bg-custom-pink hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 ${isBeginning ? 'opacity-20 cursor-not-allowed' : ''}`}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationCarousel;