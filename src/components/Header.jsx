import { useState, useEffect } from 'react'
import { X, Menu, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'


const menuItems = ['Home', 'Brechós', 'Roupas', 'Doar', 'Sobre', 'Contato']

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [textsVisible, setTextsVisible] = useState([])

  // Animação dos itens do menu desktop
  useEffect(() => {
    const timeouts = menuItems.map((_, index) =>
      setTimeout(() => setTextsVisible(prev => [...prev, true]), index * 100)
    )
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Controle de scroll do header
  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      if (isSearchOpen) {
        setIsVisible(true)
        return
      }

      const currentScroll = window.scrollY

      if (currentScroll <= 100) {
        setIsVisible(true)
      } else if (currentScroll > lastScroll) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSearchOpen])

  // Bloqueia scroll do body ao abrir menu mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById('mobile-menu')
      if (menu && !menu.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

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

  const goTo = (section) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      {/* Header fixo */}
      <motion.header
        layout
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
        className="bg-custom-cream text-custom-green shadow-md fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div onClick={() => goTo('hero-section')} className="text-2xl font-bold cursor-pointer">
            <img src="/assets/logo/logotipo-original.svg" alt="BreShopp" className="h-10 object-contain" />
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                variants={textVariants}
                initial="hidden"
                animate={textsVisible[index] ? 'visible' : 'hidden'}
              >
                <button
                  onClick={() => goTo(item === 'Home' ? 'hero-section' : item.toLowerCase() + '-section')}
                  className="hover:text-custom-olive transition"
                >
                  {item}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Botões do header */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-custom-olive/10"
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>

            <button className="p-2 rounded-full hover:bg-custom-olive/10" aria-label="Carrinho">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>

            <button className="p-2 rounded-full hover:bg-custom-olive/10" aria-label="Perfil">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Botão menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-custom-olive/10"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              <nav className="flex flex-col space-y-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item}
                    custom={index}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <button
                      onClick={() => {
                        goTo(item === 'Home' ? 'hero-section' : item.toLowerCase() + '-section')
                        setIsMenuOpen(false)
                      }}
                      className="hover:text-custom-olive transition py-2 block"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Barra de Pesquisa */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              id="search-bar"
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
                  />
                  <button
                    type="submit"
                    className="bg-custom-green text-white px-4 py-2 rounded-r-lg hover:bg-custom-olive transition"
                  >
                    Buscar
                  </button>
                </form>
                <button
                  onClick={toggleSearch}
                  className="ml-4 p-2 text-custom-green hover:text-custom-olive transition"
                >
                  <X size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Espaço para o header não cobrir conteúdo */}
      <div className="h-[65px]" />

      {/* Overlay escuro para menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header