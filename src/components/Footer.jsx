import React from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  // Referência e controle de animação ao entrar na viewport
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Obter o ano atual dinamicamente
  const currentYear = new Date().getFullYear();

  // Estrutura das colunas do footer
  const columns = [
    {
      title: null,
      content: (
        <>
          <img
            src="/assets/logo/logotipo-all-white.svg"
            alt="BreShopp - Moda Sustentável"
            className="w-32 mb-4 h-auto"
          />
          <p className="text-sm md:text-base text-white/80">
            O BreShopp é um marketplace dedicado à moda sustentável. Conecte-se a brechós e encontre peças únicas.
          </p>
        </>
      )
    },
    {
      title: 'Navegação',
      links: ['Home', 'Brechós', 'Roupas', 'Doar', 'Sobre', 'Contato']
    },
    {
      title: 'Informações',
      links: ['Termos de uso', 'Política de privacidade', 'Trocas e devoluções', 'Perguntas frequentes']
    },
    {
      title: 'Redes Sociais',
      links: ['Instagram', 'Facebook', 'Twitter', 'Pinterest']
    }
  ];

  // Configuração de animação para as colunas
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Delay progressivo baseado no índice
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <footer
      ref={containerRef}
      className="bg-custom-green text-white py-12 px-4 sm:px-6 lg:px-8"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="footer-heading" className="sr-only">Rodapé</h2>

        {/* Grid de colunas responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {columns.map((column, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={columnVariants}
              className="space-y-4"
            >
              {column.title && (
                <h3 className="text-lg font-semibold tracking-tight">
                  {column.title}
                </h3>
              )}

              {column.links ? (
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm md:text-base text-white/80 hover:text-custom-olive transition-colors duration-300 cursor-pointer"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                column.content
              )}
            </motion.div>
          ))}
        </div>

        {/* Rodapé inferior com ano dinâmico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="border-t border-custom-olive/30 mt-12 pt-8 text-center"
        >
          <p className="text-sm md:text-base text-white/80">
            © {currentYear} BreShopp. Todos os direitos reservados.
          </p>
          <p className="mt-2 text-xs md:text-sm text-white/60">
            Site desenvolvido com ♥ para um futuro mais sustentável
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;