import React, { useRef, useEffect, useState } from "react";

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

const DonationSection = () => {
  const title = useInView({ threshold: 0.1, delay: 100 });
  const description = useInView({ threshold: 0.1, delay: 200 });
  const buttons = useInView({ threshold: 0.1, delay: 300 });
  const card = useInView({ threshold: 0.1, delay: 400 });
  const stats = useInView({ threshold: 0.1, delay: 500 });

  return (
    <section className="py-12 bg-custom-green text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 md:pr-8">
            <h2
              ref={title.ref}
              className={`text-3xl font-bold mb-4 transition-all duration-700 ease-out ${
                title.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Doe roupas paradas no seu armário
            </h2>
            <p
              ref={description.ref}
              className={`mb-6 transition-all duration-700 ease-out ${
                description.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Sua doação pode ganhar um novo ciclo e ajudar brechós independentes.
              Nós cuidamos de toda a logística e você ainda pode acompanhar o impacto da sua doação.
            </p>
            <div
              ref={buttons.ref}
              className={`flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out ${
                buttons.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button className="bg-custom-pink text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                Quero doar
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition">
                Como funciona
              </button>
            </div>
          </div>

          <div
            ref={card.ref}
            className={`md:w-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              card.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white text-custom-green p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Impacto da sua doação</h3>
              <div
                ref={stats.ref}
                className={`space-y-4 transition-all duration-700 ease-out ${
                  stats.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {[
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    ),
                    title: "+3.200 peças",
                    desc: "doadas desde o início",
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    ),
                    title: "1.500kg",
                    desc: "de têxteis reciclados",
                  },
                  {
                    icon: (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    ),
                    title: "42 brechós",
                    desc: "beneficiados",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-custom-olive rounded-full p-2 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm">{item.desc}</p>
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