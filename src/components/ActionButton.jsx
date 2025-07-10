'use client'; // Indica que este é um componente do lado do cliente (Next.js)

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight,
  HeartHandshake,
  Package,
  Shirt,
  Leaf,
  Users,
  Store,
  Recycle
} from 'lucide-react';

/* Mapeamento de ícones para facilitar o uso via string como prop */
const iconComponents = {
  arrow: ArrowRight,
  chevron: ChevronRight,
  heart: HeartHandshake,
  package: Package,
  shirt: Shirt,
  leaf: Leaf,
  users: Users,
  store: Store,
  recycle: Recycle
};

const ActionButton = ({ 
  text, 
  onClick, 
  variant = "solid", 
  icon,
  iconPosition = "right",
  size = "medium",
  className = "",
  fullWidth = false,
  disabled = false,
  ...props 
}) => {
  // Classes base comuns a todos os botões
  const baseClasses = "font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Classes de tamanho pré-definidas
  const sizeClasses = {
    small: "text-xs py-2 px-4",
    medium: "text-sm py-3 px-6",
    large: "text-base py-4 px-8"
  };
  
  // Variantes de estilo disponíveis
  const variants = {
    solid: "bg-custom-olive text-white shadow-md hover:bg-custom-olive/90 hover:shadow-lg focus:ring-custom-olive/50",
    outline: "bg-transparent text-custom-green border-2 border-custom-olive/30 hover:bg-custom-olive/10 hover:border-custom-olive/50 focus:ring-custom-olive/30",
    ghost: "bg-transparent text-white border-2 border-white/50 hover:bg-white/10 focus:ring-white/20",
    secondary: "bg-custom-pink text-white shadow-md hover:bg-custom-pink/90 focus:ring-custom-pink/50",
    dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900/50"
  };

  // Resolve o componente de ícone baseado na prop (string ou componente)
  const IconComponent = icon && typeof icon === 'string' ? iconComponents[icon] : null;

  return (
    <motion.button
      onClick={onClick}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variants[variant] || ""} 
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      // Animações do Framer Motion
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      disabled={disabled}
      {...props}
    >
      {/* Renderização condicional do ícone à esquerda */}
      {IconComponent && iconPosition === "left" && (
        <motion.span
          // Animação especial para ícone de seta (pulsação horizontal)
          animate={icon === "arrow" ? { x: [0, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <IconComponent className="w-4 h-4" />
        </motion.span>
      )}

      {/* Texto do botão */}
      {text}

      {/* Renderização condicional do ícone à direita */}
      {IconComponent && iconPosition === "right" && (
        <motion.span
          // Mesma animação para ícone à direita
          animate={icon === "arrow" ? { x: [0, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <IconComponent className="w-4 h-4" />
        </motion.span>
      )}
    </motion.button>
  );
};

export default ActionButton;