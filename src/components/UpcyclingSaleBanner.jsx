import React, { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";

function useInView(options, delay) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: options?.threshold || 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isVisible, delay: delay || 0 };
}

export default function SustainableRewardsSection() {
  const badge = useInView({ threshold: 0.1 }, 100);
  const headline = useInView({ threshold: 0.1 }, 200);
  const description = useInView({ threshold: 0.1 }, 300);
  const benefits = useInView({ threshold: 0.1 }, 400);
  const buttons = useInView({ threshold: 0.1 }, 500);
  const rating = useInView({ threshold: 0.1 }, 600);
  const image = useInView({ threshold: 0.1 }, 700);

  const handleAgendarColeta = () => console.log("Agendar coleta clicado!");
  const handleVerLojas = () => console.log("Ver lojas clicado!");

  return (
    <section className="w-full relative bg-custom-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute top-0 left-0 w-64 h-64 bg-custom-pink/10 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
            badge.isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${badge.delay}ms` }}
        />
        <div
          className={`absolute bottom-0 right-0 w-80 h-80 bg-custom-olive/15 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
            headline.isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: `${headline.delay}ms` }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl order-2 lg:order-1">
            {/* Badge */}
            <div
              ref={badge.ref}
              className={`mb-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                badge.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="inline-flex items-center bg-white/90 text-custom-green text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                ♻️ PROGRAMA SUSTENTÁVEL
                <span className="ml-2 bg-custom-green text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  NOVO!
                </span>
              </span>
            </div>

            {/* Headline */}
            <div
              ref={headline.ref}
              className={`mb-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                headline.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-custom-earth leading-tight mb-3">
                <span className="block">Troque suas roupas</span>
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-custom-olive to-custom-avocado text-5xl md:text-6xl inline-block transition-all duration-500 ${
                    headline.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  por recompensas
                </span>
              </h2>
            </div>

            {/* Description */}
            <p
              ref={description.ref}
              className={`text-lg text-custom-earth/90 mb-8 leading-relaxed transition-all duration-700 ease-out ${
                description.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <strong className="font-bold text-custom-green">Ganhe até 30% OFF</strong> na sua próxima compra ao doar roupas usadas.
              Sustentabilidade que transforma seu guarda-roupa e o planeta.
            </p>

            {/* Benefits */}
            <ul
              ref={benefits.ref}
              className={`grid grid-cols-2 gap-4 mb-10 transition-all duration-500 ease-out ${
                benefits.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {[
                "+10% a cada 3 peças",
                "Cupom válido por 60 dias",
                "Ganhe até 30% OFF",
                "Embalagens sustentáveis",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-custom-earth/90">
                  <div className="mr-3 flex items-center justify-center w-6 h-6 bg-custom-olive/10 rounded-full">
                    <svg className="w-3 h-3 text-custom-green" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 1a7 7 0 100 14 7 7 0 000-14z"
                      />
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div
              ref={buttons.ref}
              className={`flex flex-col sm:flex-row gap-5 mb-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                buttons.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <ActionButton text="Agendar coleta →" onClick={handleAgendarColeta} variant="solid" />
              <ActionButton text="Ver lojas parceiras" onClick={handleVerLojas} variant="outline" />
            </div>

            {/* Rating */}
            <div
              ref={rating.ref}
              className={`mt-8 flex items-center text-custom-earth/80 gap-3 transition-all duration-700 ease-out ${
                rating.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span className="ml-2">Avaliação: 5/5</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            ref={image.ref}
            className={`flex-1 flex justify-center relative mt-10 lg:mt-0 order-1 lg:order-2 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              image.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-custom-olive/20 to-custom-green/20 rounded-3xl blur-lg -z-10"></div>

              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                <img
                  src='/assets/img/moçafelizcompras.png'
                  alt="Mulher feliz com compras"
                  className="w-full h-auto"
                />
              </div>

              <div
                className={`absolute -top-5 -right-5 bg-gradient-to-br from-custom-green to-custom-olive text-white font-bold text-2xl px-5 py-2 rounded-full rotate-12 shadow-md transition-all duration-500 ease-out ${
                  image.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: `${image.delay}ms` }}
              >
                30% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}