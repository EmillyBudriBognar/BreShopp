/**
 * Utilitários de navegação para a aplicação
 * Centraliza todas as funções de roteamento para facilitar manutenção
 */

// Navegação suave para a seção hero da página inicial
export const goToHome = () => {
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: "smooth" }); // Scroll animado
  }
};

// Navegação para páginas estáticas
export const goToCategorias = () => {
  window.location.href = "/categorias"; // Redirecionamento padrão
};

export const goToSobreNos = () => {
  window.location.href = "/sobre-nos";
};

export const goToContato = () => {
  window.location.href = "/contato";
};

export const goToLogin = () => {
  window.location.href = "/login";
};

export const goToCarrinho = () => {
  window.location.href = "/carrinho";
};

// Navegação dinâmica para conteúdo específico
export const goToProduto = (slug) => {
  window.location.href = `/produtos/${slug}`; // Rota dinâmica para produtos
};

export const goToCategoria = (slug) => {
  window.location.href = `/categorias/${slug}`; // Rota dinâmica para categorias
};