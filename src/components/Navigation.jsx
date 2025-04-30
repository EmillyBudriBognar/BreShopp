export const goToHome = () => {
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: "smooth" });
  }
};

export const goToCategorias = () => {
  window.location.href = "/categorias";
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

export const goToProduto = (slug) => {
  window.location.href = `/produtos/${slug}`;
};

export const goToCategoria = (slug) => {
  window.location.href = `/categorias/${slug}`;
};