import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, ArrowRight, Recycle, Globe } from 'lucide-react';

const PremiumCategoriesSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Use useInView hook for each animated element
  const headerRef = React.useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const gridRef = React.useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const ctaRef = React.useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const categories = [
    {
      id: 1,
      title: "Camisas",
      description: "Peças respiráveis e atemporais",
      image: "assets/img/camisa.png",
      gradient: "from-custom-green/80 to-transparent",
      badgeIcon: <Leaf size={12} className="mr-1" />,
      badgeText: "Eco-Friendly",
    },
    {
      id: 2,
      title: "Calças",
      description: "Conforto e estilo consciente",
      image: "assets/img/calca.jpg",
      gradient: "from-custom-earth/80 to-transparent",
      badgeIcon: <Leaf size={12} className="mr-1" />,
      badgeText: "Sustentável",
    },
    {
      id: 3,
      title: "Acessórios",
      description: "Detalhes que fazem diferença",
      image: "assets/img/acessorio.png",
      gradient: "from-custom-olive/80 to-transparent",
      badgeIcon: <Recycle size={12} className="mr-1" />,
      badgeText: "Reciclado",
    },
    {
      id: 4,
      title: "Calçados",
      description: "Passos com propósito",
      image: "assets/img/calcado.png",
      gradient: "from-custom-pink/50 to-transparent",
      badgeIcon: <Globe size={12} className="mr-1" />,
      badgeText: "Eco-Consciente",
    },
  ];

  return (
    <section id="products" className="bg-custom-cream py-20 px-4 md:px-8 lg:px-12 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-custom-green uppercase rounded-full bg-emerald-100">
            Coleções em destaque
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-custom-green mb-4 font-hussar">
            Categorias que amamos 💖
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Estilo, propósito e personalidade. Encontre peças que contam a sua história.
          </p>
        </motion.div>

        {/* Grid Cards */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <motion.a
              key={category.id}
              variants={itemVariants}
              href={`/categorias/${category.title.toLowerCase()}`}
              className="group relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl h-96"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} z-10`}></div>
              
              {/* Image - Replace with your actual image component */}
              <div 
                className="w-full h-full bg-gray-200 transition-transform duration-700 group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Placeholder for image */}
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-custom-green mb-1">{category.title}</h3>
                  <p className="text-sm text-custom-earth/80 mb-2">{category.description}</p>
                  <span className="inline-flex items-center text-xs font-medium text-custom-pink">
                    Explorar coleção <ArrowRight size={12} className="ml-1" />
                  </span>
                </div>
              </div>
              
              {/* Badge */}
              <div className="absolute top-4 right-4 z-20 bg-custom-white/90 text-custom-green text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
                {category.badgeIcon}
                {category.badgeText}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInVariants}
          className="text-center mt-16"
        >
          <a
            href="/categorias"
            className="inline-flex w-fit bg-custom-olive text-white font-bold py-3 px-6 rounded-full hover:bg-custom-olive/90 transition items-center gap-2 group relative"
          >
            <span className="relative z-10">Descubra Todas as Categorias</span>
            <span className="absolute inset-0 bg-gradient-to-r from-custom-olive to-custom-avocado rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumCategoriesSection;