const tailwindConfig = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          hussar: ['var(--font-hussar-bold)'],
          montserrat: ['var(--font-montserrat)'],
        },
        colors: {
          "custom-cream": "#F1EDE9",
          "custom-olive": "#B9BA79",
          "custom-green": "#3B5330",
          "custom-pink": "#E87F89",
          'custom-white': '#F8F5F4',
          'custom-sage': '#E0E4CC',
          'custom-avocado': '#A5A46A',
          'custom-earth': '#625F4C',
        },
      },
    },
    plugins: [],
  };
  
  export default tailwindConfig;