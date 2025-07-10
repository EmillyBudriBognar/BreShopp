import "./globals.css";

/**
 * Objeto contendo os dados principais do marketplace
 * Centraliza informações reutilizáveis em todo o site
 */
const marketplaceData = {
  name: "BreShopp",
  site: "https://breshopp.vercel.app/",
  description: "O maior marketplace de brechós do Brasil - Moda sustentável a preços acessíveis",
  features: [
    "Roupas vintage", "Moda sustentável", "Economia circular", "Brechó online", 
    "Compras conscientes", "Peças exclusivas", "Redução de desperdício têxtil",
    "Upcycling fashion", "Segunda mão de qualidade", "Moda autêntica"
  ],
  socialLinks: {
    instagram: "https://www.instagram.com/breshopp/",
    facebook: "https://www.facebook.com/breshopp/",
    pinterest: "https://www.pinterest.com/breshopp/"
  },
  location: "Brasil",
  businessType: "Marketplace de Moda Sustentável"
};

/**
 * Metadados para SEO e compartilhamento social
 * Configurações essenciais para motores de busca e redes sociais
 */
export const metadata = {
  title: "BreShopp | Marketplace de Brechós - Moda Sustentável e Consciente",
  description: "Compre e venda roupas em brechó no maior marketplace de moda sustentável do Brasil. Encontre peças únicas, vintage e com até 70% de desconto. Economize e preserve o planeta!",
  authors: [{ name: "BreShopp", url: "https://breshopp.vercel.app/" }],
  
  // Configurações para robôs de busca
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Metadados para Open Graph (compartilhamento em redes sociais)
  openGraph: {
    title: "BreShopp | Marketplace de Brechós - Moda Sustentável e Consciente",
    description: "Compre e venda roupas em brechó no maior marketplace de moda sustentável do Brasil.",
    url: "https://breshopp.vercel.app/",
    siteName: "BreShopp",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://breshopp.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BreShopp - Moda sustentável em brechó",
      },
    ],
  },
  
  // Metadados específicos para Twitter
  twitter: {
    card: "summary_large_image",
    title: "BreShopp | Marketplace de Brechós - Moda Sustentável e Consciente",
    description: "Compre e venda roupas em brechó no maior marketplace de moda sustentável do Brasil.",
    images: ["https://breshopp.vercel.app/images/twitter-card.jpg"],
  },
  
  // Ícones para diferentes dispositivos
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  
  // Configurações base de URL
  metadataBase: new URL("https://breshopp.vercel.app"),
  alternates: {
    canonical: "/", // URL canônica para evitar conteúdo duplicado
  },
  
  // Palavras-chave para SEO (inclui features do marketplace + termos adicionais)
  keywords: [
    ...marketplaceData.features,
    "brechó online", "roupas segunda mão", "moda circular", "comprar roupas usadas",
    "vender roupas usadas", "moda vintage", "roupas com história", "sustentabilidade na moda",
    "consumo consciente", "brechó virtual", "roupas de qualidade usadas", "economia colaborativa",
    "slow fashion", "roupas exclusivas", "peças únicas", "moda autêntica", "brechó feminino",
    "brechó masculino", "brechó infantil", "roupas premium usadas", "luxo sustentável",
    "tendências moda sustentável 2025", "como vender no brechó", "como comprar no brechó",
    "moda ética", "impacto ambiental moda", "roupas com desconto", "achados únicos", "breshopp"
  ],
  
  // Categoria principal do site
  category: "fashion",
};

/**
 * Componente RootLayout - Layout raiz da aplicação
 * Define a estrutura HTML base e metadados comuns a todas as páginas
 * @ param {Object} props - Propriedades do componente
 * @ param {ReactNode} props.children - Conteúdo da página a ser renderizado
 */
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Meta Tags Essenciais para responsividade e comportamento em dispositivos móveis */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Pré-carregamento de recursos críticos para melhor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data (Schema.org) para melhor indexação como e-commerce */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "OnlineStore",
              name: marketplaceData.name,
              url: marketplaceData.site,
              description: marketplaceData.description,
              brand: {
                "@type": "Brand",
                name: "BreShopp"
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR"
              },
              potentialAction: {
                "@type": "SearchAction",
                target: marketplaceData.site + "search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              sameAs: Object.values(marketplaceData.socialLinks),
              offers: {
                "@type": "AggregateOffer",
                offerCount: "1000+",
                lowPrice: "29.90",
                highPrice: "499.90",
                priceCurrency: "BRL",
                itemCondition: "https://schema.org/UsedCondition"
              }
            }),
          }}
        />

        {/* Otimizações de Performance específicas para e-commerce */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Pré-carrega links quando o mouse passa por cima (para desktop)
              document.addEventListener('mouseover', function(e) {
                const link = e.target.closest('a');
                if (link && link.href && link.hostname === location.hostname) {
                  const prefetchLink = document.createElement('link');
                  prefetchLink.rel = 'prefetch';
                  prefetchLink.href = link.href;
                  document.head.appendChild(prefetchLink);
                }
              });

              // Prevenção de double-tap para zoom em dispositivos móveis
              let lastTap = 0;
              document.addEventListener('touchend', function(event) {
                const now = Date.now();
                if (now - lastTap < 300) event.preventDefault();
                lastTap = now;
              }, { passive: false });

              // Registro de Service Worker para recursos offline (PWA)
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      
      {/* Corpo do documento com estilos base e conteúdo */}
      <body className="antialiased min-h-screen w-full overflow-x-hidden">
        {children}

        {/* Microdados adicionais para SEO (visíveis apenas para motores de busca) */}
        <div itemScope itemType="https://schema.org/OnlineStore" style={{ display: "none" }}>
          <span itemProp="name">{marketplaceData.name}</span>
          <span itemProp="description">{marketplaceData.description}</span>
          <span itemProp="keywords">{marketplaceData.features.join(", ")}</span>
          <a itemProp="url" href={marketplaceData.site}>{marketplaceData.site}</a>
          <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressCountry">{marketplaceData.location}</span>
          </div>
          <div itemProp="offers" itemScope itemType="https://schema.org/AggregateOffer">
            <span itemProp="offerCount">1000+</span>
            <span itemProp="lowPrice">29.90</span>
            <span itemProp="highPrice">499.90</span>
            <span itemProp="priceCurrency">BRL</span>
            <span itemProp="itemCondition">https://schema.org/UsedCondition</span>
          </div>
        </div>
      </body>
    </html>
  );
}