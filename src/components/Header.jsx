import React, { useState, useEffect, useRef } from 'react'
import { X, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const menuItems = ['Home', 'Brechós', 'Roupas', 'Doar', 'Sobre', 'Contato']

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const searchRef = useRef(null)
  const menuRef = useRef(null)
  const menuItemRefs = useRef(menuItems.map(() => React.createRef()))
  
  const inViews = menuItems.map((_, i) => 
    useInView(menuItemRefs.current[i], { once: true, margin: "-20px" }))
  
  // Efeito para fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
      }
      
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen, isMenuOpen])

  // Efeito para esconder header no scroll (exceto quando search aberto)
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      if (isSearchOpen) return // Mantém visível se search aberto

      const currentScroll = window.scrollY
      setIsVisible(currentScroll <= 100 || currentScroll < lastScroll)
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSearchOpen])

  // Efeito para bloquear scroll quando menu mobile aberto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
    return () => document.body.style.overflow = 'auto'
  }, [isMenuOpen])

  // Manipuladores de eventos
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      alert(`Busca por: ${searchQuery.trim()}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
    setIsSearchOpen(false)
  }

  const goToSection = (section) => {
    const element = document.getElementById(
      section === 'Home' ? 'hero-section' : `${section.toLowerCase()}-section`
    )
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  // Variantes de animação
  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  }

  return (
    <div className="relative">
      {/* Header principal fixo */}
      <motion.header
        layout
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
        className="bg-custom-cream text-custom-green shadow-md fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => goToSection('Home')} 
            className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Ir para página inicial"
          >
            <img 
              src="/assets/logo/logotipo-original.svg" 
              alt="BreShopp" 
              className="h-10 object-contain" 
            />
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                ref={menuItemRefs.current[index]}
                variants={textVariants}
                initial="hidden"
                animate={inViews[index] ? "visible" : "hidden"}
              >
                <button
                  onClick={() => goToSection(item)}
                  className="hover:text-custom-olive transition cursor-pointer py-1 px-2 rounded hover:bg-custom-olive/10"
                  aria-label={`Ir para ${item}`}
                >
                  {item}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Ícones de ação */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-custom-olive/10 cursor-pointer transition-colors"
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>

            <button 
              className="p-2 rounded-full hover:bg-custom-olive/10 cursor-pointer transition-colors" 
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={20} />
            </button>

            <button 
              className="p-2 rounded-full hover:bg-custom-olive/10 cursor-pointer transition-colors" 
              aria-label="Perfil do usuário"
            >
              <User size={20} />
            </button>

            {/* Botão do menu mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-custom-olive/10 cursor-pointer transition-colors"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile com animação */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="md:hidden mt-4 pb-4 px-4"
            >
              <nav className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    custom={index}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      onClick={() => goToSection(item)}
                      className="hover:text-custom-olive transition cursor-pointer py-3 px-4 text-left rounded-lg hover:bg-custom-olive/10 w-full"
                      aria-label={`Ir para ${item}`}
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra de pesquisa com animação */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
              className="absolute top-full left-0 w-full bg-custom-cream shadow-md z-50"
            >
              <div className="container mx-auto px-4 py-3 flex items-center border-t border-custom-green/20">
                <form onSubmit={handleSearch} className="flex-1 flex">
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    className="w-full px-4 py-2 rounded-l-lg border border-custom-green focus:outline-none focus:ring-2 focus:ring-custom-olive"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    aria-label="Campo de pesquisa"
                  />
                  <button
                    type="submit"
                    className="bg-custom-green text-white px-4 py-2 rounded-r-lg hover:bg-custom-olive transition cursor-pointer"
                    aria-label="Buscar"
                  >
                    Buscar
                  </button>
                </form>
                <button
                  onClick={toggleSearch}
                  className="ml-4 p-2 text-custom-green hover:text-custom-olive transition cursor-pointer"
                  aria-label="Fechar pesquisa"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Espaçamento para compensar header fixo */}
      <div className="h-[65px]" />

      {/* Overlay do menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header