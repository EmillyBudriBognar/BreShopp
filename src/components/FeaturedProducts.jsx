import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import { goToCategorias } from "./Navigation";

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

const FeaturedProducts = () => {
  const title = useInView({ threshold: 0.1 });
  const subtitle = useInView({ threshold: 0.1, delay: 150 });
  const tag = useInView({ threshold: 0.1, delay: 50 });
  const grid = useInView({ threshold: 0.1, delay: 200 });
  const button = useInView({ threshold: 0.1, delay: 250 });

  const categories = [
    { id: 1, name: "Camisas", slug: "camisas", short: "Camisas" },
    { id: 2, name: "Calças", slug: "calcas", short: "Calças" },
    { id: 3, name: "Acessórios", slug: "acessorios", short: "Acessórios" },
    { id: 4, name: "Tênis", slug: "tenis", short: "Tênis" },
  ];

  return (
    <section className="bg-custom-cream py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-16">
          <div
            ref={tag.ref}
            className={`inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-custom-green uppercase rounded-full bg-emerald-200 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              tag.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Coleções
          </div>
          <h2
            ref={title.ref}
            className={`text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              title.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Categorias que amamos{" "}
            <span
              className={`inline-block transition-all duration-500 ease-in ${
                title.isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
              }`}
            >
              💖
            </span>
          </h2>
          <p
            ref={subtitle.ref}
            className={`text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 ease-out ${
              subtitle.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Estilo, propósito e personalidade. Descubra peças que contam sua história.
          </p>
        </div>

        {/* Grid de categorias */}
        <div
          ref={grid.ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, index) => (
            <a
              key={cat.id}
              href={`/categorias/${cat.slug}`}
              aria-label={`Ver categoria ${cat.short}`}
              className={`relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ease-in-out h-64 flex flex-col transform ${
                grid.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: grid.isVisible ? `${index * 100 + 200}ms` : "0ms",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="relative z-10 flex flex-col justify-center items-center text-white text-lg font-semibold">
                <span className="mb-4">{cat.name}</span>
                <span className="text-sm">{cat.short}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Botão para explorar categorias */}
        <div
          ref={button.ref}
          className={`text-center mt-16 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            button.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ActionButton
            text="Explorar todas as categorias →"
            onClick={goToCategorias}
            variant="solid"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;