import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { Shirt, ChevronRight, HeartHandshake, Recycle, Store } from "lucide-react";
import ActionButton from "./ActionButton";

const DonationSection = () => {
  // Referências para animação de scroll
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  // Verificação de elementos na viewport
  const titleInView = useInView(titleRef, { threshold: 0.1 });
  const descInView = useInView(descRef, { threshold: 0.1 });
  const buttonsInView = useInView(buttonsRef, { threshold: 0.1 });
  const cardInView = useInView(cardRef, { threshold: 0.1 });
  const statsInView = useInView(statsRef, { threshold: 0.1 });

  // Funções utilitárias para classes de animação
  const animationClasses = (isVisible, delay = "0ms") =>
    `transition-all duration-700 ease-out delay-[${delay}] ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  const cardAnimation = (isVisible) =>
    `transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[400ms] ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  // Dados dos cards de estatísticas
  const impactStats = [
    {
      icon: <Shirt className="text-white" />,
      title: "+3.200 peças",
      desc: "doadas desde o início"
    },
    {
      icon: <Recycle className="text-white" />,
      title: "1.500kg",
      desc: "de têxteis reciclados"
    },
    {
      icon: <Store className="text-white" />,
      title: "42 brechós",
      desc: "beneficiados"
    }
  ];

  return (
    <section className="py-16 bg-custom-olive text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Coluna esquerda - Conteúdo principal */}
          <div className="md:w-1/2 md:pr-8">
            <h2
              ref={titleRef}
              className={`text-4xl font-bold mb-6 ${animationClasses(
                titleInView,
                "100ms"
              )}`}
            >
              Doe roupas paradas no seu armário
            </h2>
            
            <p
              ref={descRef}
              className={`mb-8 text-lg ${animationClasses(descInView, "200ms")}`}
            >
              Sua doação pode ganhar um novo ciclo e ajudar brechós independentes.
              Nós cuidamos de toda a logística e você ainda pode acompanhar o impacto da sua doação.
            </p>
            
            <div
              ref={buttonsRef}
              className={`flex flex-col sm:flex-row gap-4 ${animationClasses(
                buttonsInView,
                "300ms"
              )}`}
            >
              <ActionButton
                text="Quero doar"
                variant="secondary"
                icon="arrow"
                className="w-full sm:w-auto"
              />
              <ActionButton
                text="Como funciona"
                variant="ghost"
                icon={<ChevronRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Coluna direita - Card de impacto */}
          <div
            ref={cardRef}
            className={`md:w-1/2 ${cardAnimation(cardInView)}`}
          >
            <div className="bg-white text-custom-green p-8 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HeartHandshake className="text-custom-pink" />
                Impacto da sua doação
              </h3>
              
              <div
                ref={statsRef}
                className={`space-y-6 ${animationClasses(statsInView, "500ms")}`}
              >
                {impactStats.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-custom-pink rounded-full p-2 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-custom-green/80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;