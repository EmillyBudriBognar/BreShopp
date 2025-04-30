import React, { useRef, useEffect, useState } from 'react';

function useInView(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (options?.delay) {
          setTimeout(() => setIsVisible(true), options.delay);
        } else {
          setIsVisible(true);
        }
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
}

const Footer = () => {
  const col1 = useInView({ threshold: 0.1, delay: 100 });
  const col2 = useInView({ threshold: 0.1, delay: 200 });
  const col3 = useInView({ threshold: 0.1, delay: 300 });
  const col4 = useInView({ threshold: 0.1, delay: 400 });
  const bottom = useInView({ threshold: 0.1, delay: 500 });

  return (
    <footer className="bg-custom-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo + descrição */}
          <div
            ref={col1.ref}
            className={`transition-all duration-700 ease-out ${
              col1.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <img
              src="/assets/logo/logotipo-all-white.svg"
              alt="BreShopp - Moda Sustentável"
              className="w-32 mb-4"
            />
            <p>
              A BreShopp é um marketplace dedicado à moda sustentável. Conecte-se a brechós e encontre peças únicas.
            </p>
            <div className="mt-4 space-x-4">
              {['facebook', 'instagram', 'twitter', 'pinterest'].map((social) => (
                <a key={social} href="#" className="hover:text-custom-olive transition">
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div
            ref={col2.ref}
            className={`transition-all duration-700 ease-out ${
              col2.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {['Home', 'Brechós', 'Roupas', 'Doar', 'Sobre', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-custom-olive transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Informações */}
          <div
            ref={col3.ref}
            className={`transition-all duration-700 ease-out ${
              col3.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-bold mb-4">Informações</h4>
            <ul className="space-y-2">
              {['Termos de uso', 'Política de privacidade', 'Trocas e devoluções', 'Perguntas frequentes'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-custom-olive transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Newsletter */}
          <div
            ref={col4.ref}
            className={`transition-all duration-700 ease-out ${
              col4.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="mb-4">
              Assine para receber novidades e promoções.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-4 py-2 w-full rounded-l text-custom-green focus:outline-none"
              />
              <button
                type="submit"
                className="bg-custom-pink px-4 py-2 rounded-r hover:bg-opacity-90 transition"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>

        {/* Rodapé final */}
        <div
          ref={bottom.ref}
          className={`border-t border-custom-olive border-opacity-30 mt-8 pt-8 text-center transition-all duration-700 ease-out ${
            bottom.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p>© 2025 BreShopp. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Site desenvolvido com ♥ para um futuro mais sustentável</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;