import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import ActionButton from './ActionButton';

function useInView({ threshold }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

const ProductGrid = ({ products }) => {
  const tag = useInView({ threshold: 0.1 });
  const title = useInView({ threshold: 0.1 });
  const subtitle = useInView({ threshold: 0.1 });
  const grid = useInView({ threshold: 0.1 });
  const button = useInView({ threshold: 0.1 });

  return (
    <section className="py-12 bg-custom-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span
            ref={tag.ref}
            className={`inline-block text-2xl font-semibold text-custom-pink transition-all duration-500 ease-out ${
              tag.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${tag.isVisible ? '300ms' : '0ms'}` }}
          >
            Our Collection
          </span>

          <h2
            ref={title.ref}
            className={`text-4xl font-bold text-custom-green mt-4 transition-all duration-500 ease-out ${
              title.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${title.isVisible ? '400ms' : '0ms'}` }}
          >
            Exclusive Fashion Items
          </h2>

          <p
            ref={subtitle.ref}
            className={`text-lg text-custom-green/80 mt-4 transition-all duration-500 ease-out ${
              subtitle.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${subtitle.isVisible ? '500ms' : '0ms'}` }}
          >
            Discover unique pieces that tell a story and reduce the impact of fast fashion.
          </p>
        </div>

        <div
          ref={grid.ref}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 transition-all duration-500 ease-out ${
            grid.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ease-out ${
                grid.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: grid.isVisible ? `${index * 100 + 300}ms` : '0ms',
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div
          ref={button.ref}
          className={`mt-12 text-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            button.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ActionButton
            text="Ver todas as peças →"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="solid"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;