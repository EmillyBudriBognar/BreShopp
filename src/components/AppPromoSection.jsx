import React, { useState, useEffect, useRef } from "react";
import { Gift, Check, Clock } from "lucide-react";

// Hook customizado para detectar quando elementos entram na viewport
function useInView(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Permite atraso opcional antes de marcar como visível
        options?.delay 
          ? setTimeout(() => setIsVisible(true), options.delay)
          : setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

export default function AppPromoSection() {
  // Contador regressivo para a oferta
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  // Elementos com animação de entrada controlados pelo hook useInView
  const badge = useInView({ threshold: 0.1, delay: 100 });
  const headline = useInView({ threshold: 0.1, delay: 200 });
  const description = useInView({ threshold: 0.1, delay: 300 });
  const benefits = useInView({ threshold: 0.1, delay: 400 });
  const buttons = useInView({ threshold: 0.1, delay: 500 });
  const timer = useInView({ threshold: 0.1, delay: 600 });
  const image = useInView({ threshold: 0.1, delay: 700 });

  // Atualiza o contador regressivo a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        // Lógica para decrementar o tempo
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (n) => (n < 10 ? `0${n}` : n);

  return (
    <section className="w-full relative bg-custom-white overflow-hidden">
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-0 left-0 w-64 h-64 bg-custom-pink/10 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
          badge.isVisible ? "opacity-100" : "opacity-0"
        }`} />
        <div className={`absolute bottom-0 right-0 w-80 h-80 bg-custom-olive/15 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
          headline.isVisible ? "opacity-100" : "opacity-0"
        }`} />
      </div>

      {/* Conteúdo principal com animações em cascata */}
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            {/* Badge de oferta */}
            <div ref={badge.ref} className={`mb-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              badge.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <span className="inline-flex items-center gap-2 bg-white/90 text-custom-green text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <Gift className="w-4 h-4" />
                OFERTA POR TEMPO LIMITADO
                <span className="ml-2 bg-custom-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  NOVO!
                </span>
              </span>
            </div>

            {/* Título principal */}
            <div ref={headline.ref} className={`mb-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              headline.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-custom-earth leading-tight">
                <span className="block">Desconto especial de</span>
                <span className="text-custom-pink text-5xl md:text-6xl inline-block">
                  50% OFF
                </span>
              </h2>
            </div>

            {/* Descrição */}
            <p ref={description.ref} className={`text-lg text-custom-earth/90 mb-8 leading-relaxed transition-all duration-700 ease-out ${
              description.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              <strong className="font-bold text-custom-red">Metade do preço</strong> na sua primeira compra pelo app!
            </p>

            {/* Lista de benefícios */}
            <ul ref={benefits.ref} className={`space-y-3 mb-10 transition-all duration-500 ease-out ${
              benefits.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              {[
                "Oferta válida por 48h",
                "Frete grátis no primeiro pedido",
                "Pagamento facilitado",
                "Acesso a promoções exclusivas",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-custom-earth/90">
                  <div className="mr-3 flex items-center justify-center w-6 h-6 bg-custom-olive/10 rounded-full">
                    <Check className="w-4 h-4 text-custom-green" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Botões de download */}
            <div ref={buttons.ref} className={`flex flex-row justify-center gap-4 mb-8 sm:justify-start transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              buttons.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <a href="#" className="transition hover:opacity-90 h-[52px] flex">
                <img src="/assets/img/download-apple.svg" alt="App Store" className="h-full w-auto object-contain" />
              </a>
              <a href="#" className="transition hover:opacity-90 h-[52px] flex">
                <img src="/assets/img/download-google.svg" alt="Google Play" className="h-full w-auto object-contain" />
              </a>
            </div>

            {/* Temporizador da oferta */}
            <div ref={timer.ref} className={`p-4 bg-white/80 rounded-lg border border-gray-200 shadow-sm transition-all duration-700 ease-out ${
              timer.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <div className="flex items-center justify-center gap-3 text-custom-earth">
                <Clock className="w-5 h-5 text-custom-red" />
                <span className="font-medium">Oferta termina em:</span>
                <span className="font-bold text-custom-red">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Imagem do mockup do app */}
          <div ref={image.ref} className={`flex-1 flex justify-center relative mt-10 lg:mt-0 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            image.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="relative w-full max-w-md">
              <div className="relative overflow-hidden">
                <img src="/assets/img/mockup.png" alt="Visual do aplicativo" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}