import React, { useState, useEffect, useRef } from "react";


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

export default function AppPromoSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0,
  });

  // Animações com delays diferentes para cada elemento
  const badge = useInView({ threshold: 0.1, delay: 100 });
  const headline = useInView({ threshold: 0.1, delay: 200 });
  const description = useInView({ threshold: 0.1, delay: 300 });
  const benefits = useInView({ threshold: 0.1, delay: 400 });
  const buttons = useInView({ threshold: 0.1, delay: 500 });
  const timer = useInView({ threshold: 0.1, delay: 600 });
  const image = useInView({ threshold: 0.1, delay: 700 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours >= 0 ? newHours : 0,
          minutes: newMinutes >= 0 ? newMinutes : 59,
          seconds: newSeconds >= 0 ? newSeconds : 59,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time.toString();
  };

  return (
    <section className="w-full relative bg-custom-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className={`absolute top-0 left-0 w-64 h-64 bg-custom-pink/10 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
            badge.isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: badge.isVisible ? "100ms" : "0ms" }}
        ></div>
        <div 
          className={`absolute bottom-0 right-0 w-80 h-80 bg-custom-olive/15 rounded-full blur-[80px] transition-all duration-1000 ease-out ${
            headline.isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: headline.isVisible ? "300ms" : "0ms" }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Main text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div 
              ref={badge.ref}
              className={`mb-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                badge.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="inline-flex items-center bg-white/90 text-custom-green text-sm font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                🎁 OFERTA POR TEMPO LIMITADO
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
                <span className="block">Desconto especial de</span>
                <span 
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-custom-pink to-custom-red text-5xl md:text-6xl inline-block transition-all duration-500 ${
                    headline.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  50% OFF
                </span>
              </h2>
            </div>

            <p 
              ref={description.ref}
              className={`text-lg text-custom-earth/90 mb-8 leading-relaxed transition-all duration-700 ease-out ${
                description.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <strong className="font-bold text-custom-red">Metade do preço</strong> na sua primeira compra pelo app! 
              Aproveite esta oferta única para renovar seu guarda-roupa com nossas peças premium.
            </p>

            {/* Benefits */}
            <ul 
              ref={benefits.ref}
              className={`space-y-3 mb-10 transition-all duration-500 ease-out ${
                benefits.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {[ 
                "Oferta válida por 48h", 
                "Frete grátis no primeiro pedido", 
                "Pagamento facilitado", 
                "Acesso a promoções exclusivas", 
              ].map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-custom-earth/90"
                >
                  <div className="mr-3 flex items-center justify-center w-6 h-6 bg-custom-olive/10 rounded-full">
                    <svg className="w-3 h-3 text-custom-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Download buttons */}
            <div 
              ref={buttons.ref}
              className={`flex flex-row justify-center gap-4 mb-8 sm:justify-start transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                buttons.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <a href="#" className="transition hover:opacity-90 h-[52px] flex">
                <img
                  src="/assets/img/download-apple.svg"
                  alt="App Store"
                  className="h-full w-auto object-contain"
                />
              </a>
              <a href="#" className="transition hover:opacity-90 h-[52px] flex">
                <img
                  src="/assets/img/download-google.svg"
                  alt="Google Play"
                  className="h-full w-auto object-contain"
                />
              </a>
            </div>

            {/* Countdown timer */}
            <div 
              ref={timer.ref}
              className={`p-4 bg-white/80 rounded-lg border border-gray-200 shadow-sm transition-all duration-700 ease-out ${
                timer.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-center gap-3 text-custom-earth">
                <svg className="w-5 h-5 text-custom-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-medium">Oferta termina em:</span>
                <span className="font-bold text-custom-red">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div 
            ref={image.ref}
            className={`flex-1 flex justify-center relative mt-10 lg:mt-0 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              image.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-custom-pink/20 to-custom-red/20 rounded-3xl blur-lg -z-10"></div>
              
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-lg">
                <img
                  src="/assets/app-preview.png"
                  alt="Visual do aplicativo"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Discount highlight */}
              <div 
                className={`absolute -top-5 -right-5 bg-gradient-to-br from-custom-red to-custom-pink text-white font-bold text-2xl px-5 py-2 rounded-full rotate-12 shadow-md transition-all duration-500 ease-out ${
                  image.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: image.isVisible ? "900ms" : "0ms" }}
              >
                50% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}